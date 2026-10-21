import {PracticeQuestion} from './nigerian-subjects';

export type ValidationResult={valid:boolean;score:number;reasons:string[]};
const normalized=(value:string)=>value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
const tokens=(value:string)=>new Set(normalized(value).split(' ').filter(x=>x.length>2));
export function questionSimilarity(a:string,b:string){const A=tokens(a),B=tokens(b);if(!A.size||!B.size)return 0;let common=0;for(const x of A)if(B.has(x))common++;return common/Math.max(A.size,B.size)}

/** Safety gate for verified and future AI-authored questions. Generated output is never auto-trusted. */
export function validateQuestion(q:PracticeQuestion,existing:PracticeQuestion[]=[]):ValidationResult{
  const reasons:string[]=[];
  if(!q.id?.trim())reasons.push('missing id');
  if(!q.subject?.trim())reasons.push('missing subject');
  if(!q.topic?.trim())reasons.push('missing syllabus topic');
  if(!q.q?.trim()||q.q.trim().length<12)reasons.push('question too short');
  if(!Array.isArray(q.o)||q.o.length!==4)reasons.push('requires exactly four options');
  if(!Number.isInteger(q.a)||q.a<0||q.a>3)reasons.push('invalid correct answer index');
  const options=(q.o??[]).map(normalized);
  if(new Set(options).size!==options.length)reasons.push('duplicate options');
  if(options.some(x=>!x))reasons.push('empty option');
  // Compare likely duplicates only inside the same subject/topic. The old 0.82
  // whole-bank threshold incorrectly removed distinct short Mathematics items.
  const near=existing.find(x=>x.id!==q.id&&x.subject===q.subject&&normalized(x.topic)===normalized(q.topic)&&questionSimilarity(x.q,q.q)>=0.90);
  if(near)reasons.push(`near-duplicate of ${near.id}`);
  return{valid:reasons.length===0,score:Math.max(0,100-reasons.length*20),reasons};
}
export function verifiedPool(pool:PracticeQuestion[]){const accepted:PracticeQuestion[]=[];for(const q of pool)if(validateQuestion(q,accepted).valid)accepted.push(q);return accepted}
export function validateCandidateBatch(candidates:PracticeQuestion[],existing:PracticeQuestion[]=[]){const accepted:PracticeQuestion[]=[];const rejected:{question:PracticeQuestion;validation:ValidationResult}[]=[];for(const q of candidates){const validation=validateQuestion(q,[...existing,...accepted]);if(validation.valid)accepted.push(q);else rejected.push({question:q,validation})}return{accepted,rejected}}
