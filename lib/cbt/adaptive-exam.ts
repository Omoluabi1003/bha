import {PracticeQuestion} from './nigerian-subjects';

export type ExamMode='learn'|'practice'|'simulation';
export type ExamSession={id:string;seed:string;questions:PracticeQuestion[];unseenCount:number;reusedCount:number;createdAt:number};
export type SavedExam={exam:string;subject:string;slot:number;session:ExamSession;answers:Record<number,number>;skipped:number[];secondsLeft:number;mode:ExamMode};
export type TopicPerformance={topic:string;correct:number;total:number;percent:number};

function hash(value:string){let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function makeSeed(){return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}
function shuffle<T>(items:T[],seed:string){return [...items].sort((a,b)=>hash(`${seed}:${JSON.stringify(a)}`)-hash(`${seed}:${JSON.stringify(b)}`))}

/** Fresh verified paper. Seen questions are deprioritized and option order changes per sitting. */
export function buildAdaptiveExam(pool:PracticeQuestion[],questionCount:number,seenIds:string[],seed=makeSeed()):ExamSession{
  if(pool.length<questionCount)return{id:`bha-${seed}`,seed,questions:[],unseenCount:0,reusedCount:0,createdAt:Date.now()};
  const seen=new Set(seenIds);
  const unseen=shuffle(pool.filter(q=>!seen.has(q.id)),`${seed}:unseen`);
  const prior=shuffle(pool.filter(q=>seen.has(q.id)),`${seed}:prior`);
  const candidates=[...unseen,...prior];
  const byTopic=new Map<string,PracticeQuestion[]>();
  for(const q of candidates){const key=q.topic||'General';byTopic.set(key,[...(byTopic.get(key)||[]),q])}
  const topics=shuffle([...byTopic.keys()],`${seed}:topics`);
  const chosen:PracticeQuestion[]=[];
  while(chosen.length<questionCount&&topics.some(t=>(byTopic.get(t)?.length||0)>0))for(const topic of topics){if(chosen.length>=questionCount)break;const next=byTopic.get(topic)?.shift();if(next)chosen.push(next)}
  const questions=shuffle(chosen,`${seed}:questions`).map(q=>{const optionOrder=shuffle(q.o.map((text,original)=>({text,original})),`${seed}:${q.id}:options`);return{...q,o:optionOrder.map(x=>x.text),a:optionOrder.findIndex(x=>x.original===q.a)}});
  const unseenCount=chosen.filter(q=>!seen.has(q.id)).length;
  return{id:`bha-${hash(seed).toString(36)}`,seed,questions,unseenCount,reusedCount:chosen.length-unseenCount,createdAt:Date.now()};
}

export function historyKey(exam:string,subject:string){return `bha-cbt-history:${exam}:${subject}`}
export function readSeenQuestionIds(exam:string,subject:string){if(typeof window==='undefined')return[];try{const raw=localStorage.getItem(historyKey(exam,subject));const parsed=raw?JSON.parse(raw):[];return Array.isArray(parsed)?parsed.filter(x=>typeof x==='string'):[]}catch{return[]}}
export function rememberQuestions(exam:string,subject:string,ids:string[]){if(typeof window==='undefined')return;const merged=[...new Set([...readSeenQuestionIds(exam,subject),...ids])].slice(-2000);localStorage.setItem(historyKey(exam,subject),JSON.stringify(merged))}

function sessionKey(exam:string,subject:string,slot:number){return `bha-cbt-session:${exam}:${subject}:${slot}`}
export function saveLockedExam(value:SavedExam){if(typeof window==='undefined')return;localStorage.setItem(sessionKey(value.exam,value.subject,value.slot),JSON.stringify(value))}
export function readLockedExam(exam:string,subject:string,slot:number):SavedExam|null{if(typeof window==='undefined')return null;try{const raw=localStorage.getItem(sessionKey(exam,subject,slot));if(!raw)return null;const saved=JSON.parse(raw) as SavedExam;return saved?.session?.questions?.length?saved:null}catch{return null}}
export function clearLockedExam(exam:string,subject:string,slot:number){if(typeof window==='undefined')return;localStorage.removeItem(sessionKey(exam,subject,slot))}

export function analyzePerformance(questions:PracticeQuestion[],answers:Record<number,number>):TopicPerformance[]{const map=new Map<string,{correct:number;total:number}>();questions.forEach((q,i)=>{const topic=q.topic||'General',v=map.get(topic)||{correct:0,total:0};v.total++;if(answers[i]===q.a)v.correct++;map.set(topic,v)});return [...map.entries()].map(([topic,v])=>({topic,...v,percent:Math.round(v.correct/v.total*100)})).sort((a,b)=>a.percent-b.percent)}
