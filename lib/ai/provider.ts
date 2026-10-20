export type BHAInsightRequest={mode:'explain'|'coach'|'generate';prompt:string;context?:string};
export type BHAInsight={text:string;provider:string;model:string};
const system=`You are the BHA Learning Assistant for Best Home Academy, Eket. Support JAMB, WAEC and NECO preparation. Be accurate, age-appropriate and concise. Never change an official CBT score or invent a student's record. For question generation, output original educational material and never imitate or reproduce proprietary commercial question banks. If information is uncertain, say so.`;
export async function runBhaAI(input:BHAInsightRequest):Promise<BHAInsight>{
 const provider=(process.env.BHA_AI_PROVIDER||'groq').toLowerCase();
 if(provider==='gemini') return runGemini(input);
 return runGroq(input);
}
async function runGroq(input:BHAInsightRequest):Promise<BHAInsight>{
 const key=process.env.GROQ_API_KEY;if(!key) throw new Error('BHA AI is not configured');
 const model=process.env.BHA_GROQ_MODEL||'openai/gpt-oss-120b';
 const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${key}`},body:JSON.stringify({model,temperature:input.mode==='generate'?.7:.2,messages:[{role:'system',content:system},{role:'user',content:`${input.context||''}\n\n${input.prompt}`} ]})});
 if(!r.ok) throw new Error(`BHA AI provider error ${r.status}`);const j=await r.json();return{text:j.choices?.[0]?.message?.content||'No explanation available.',provider:'groq',model};
}
async function runGemini(input:BHAInsightRequest):Promise<BHAInsight>{
 const key=process.env.GEMINI_API_KEY;if(!key) throw new Error('BHA AI fallback is not configured');
 const model=process.env.BHA_GEMINI_MODEL||'gemini-2.5-flash';
 const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({systemInstruction:{parts:[{text:system}]},contents:[{role:'user',parts:[{text:`${input.context||''}\n\n${input.prompt}`}]}]})});
 if(!r.ok) throw new Error(`BHA AI fallback error ${r.status}`);const j=await r.json();return{text:j.candidates?.[0]?.content?.parts?.map((p:{text?:string})=>p.text||'').join('')||'No explanation available.',provider:'gemini',model};
}