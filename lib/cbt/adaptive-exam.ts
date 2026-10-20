import {PracticeQuestion} from './nigerian-subjects';

export type ExamMode='practice'|'simulation';
export type ExamSession={id:string;seed:string;questions:PracticeQuestion[];unseenCount:number;reusedCount:number};

function hash(value:string){let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function makeSeed(){return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}
function shuffle<T>(items:T[],seed:string){return [...items].sort((a,b)=>hash(`${seed}:${JSON.stringify(a)}`)-hash(`${seed}:${JSON.stringify(b)}`))}

/**
 * Builds a fresh locked exam from verified questions. Previously seen questions
 * are deprioritized, not permanently excluded, so small verified banks still work.
 * The returned seed locks the paper for the lifetime of the session.
 */
export function buildAdaptiveExam(pool:PracticeQuestion[],questionCount:number,seenIds:string[],seed=makeSeed()):ExamSession{
  if(pool.length<questionCount)return{id:`bha-${seed}`,seed,questions:[],unseenCount:0,reusedCount:0};
  const seen=new Set(seenIds);
  const unseen=shuffle(pool.filter(q=>!seen.has(q.id)),`${seed}:unseen`);
  const prior=shuffle(pool.filter(q=>seen.has(q.id)),`${seed}:prior`);
  const chosen=[...unseen,...prior].slice(0,questionCount);
  const questions=chosen.map((q,index)=>{
    const optionOrder=shuffle(q.o.map((text,original)=>({text,original})),`${seed}:${q.id}:options`);
    return {...q,id:q.id,o:optionOrder.map(x=>x.text),a:optionOrder.findIndex(x=>x.original===q.a),sessionOrder:index};
  });
  const unseenCount=chosen.filter(q=>!seen.has(q.id)).length;
  return{id:`bha-${hash(seed).toString(36)}`,seed,questions,unseenCount,reusedCount:chosen.length-unseenCount};
}

export function historyKey(exam:string,subject:string){return `bha-cbt-history:${exam}:${subject}`}
export function readSeenQuestionIds(exam:string,subject:string){if(typeof window==='undefined')return[];try{const raw=localStorage.getItem(historyKey(exam,subject));const parsed=raw?JSON.parse(raw):[];return Array.isArray(parsed)?parsed.filter(x=>typeof x==='string'):[]}catch{return[]}}
export function rememberQuestions(exam:string,subject:string,ids:string[]){if(typeof window==='undefined')return;const merged=[...new Set([...readSeenQuestionIds(exam,subject),...ids])].slice(-2000);localStorage.setItem(historyKey(exam,subject),JSON.stringify(merged))}
