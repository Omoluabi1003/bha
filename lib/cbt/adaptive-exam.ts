import {PracticeQuestion} from './nigerian-subjects';
import {applyBlueprint} from './exam-blueprint';
import {verifiedPool} from './question-validator';

export type ExamMode='practice'|'simulation';
export type ExamSession={id:string;seed:string;questions:PracticeQuestion[];unseenCount:number;reusedCount:number};

function hash(value:string){let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function makeSeed(){return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}
function shuffle<T>(items:T[],seed:string){return [...items].sort((a,b)=>hash(`${seed}:${JSON.stringify(a)}`)-hash(`${seed}:${JSON.stringify(b)}`))}

/** Builds a fresh, balanced, locked examination from verified questions.
 * Unseen questions rank ahead of previously seen questions. The blueprint then
 * spreads selection across available topics instead of relying on blind randomization. */
export function buildAdaptiveExam(pool:PracticeQuestion[],questionCount:number,seenIds:string[],seed=makeSeed()):ExamSession{
  const safePool=verifiedPool(pool);
  if(safePool.length<questionCount)return{id:`bha-${seed}`,seed,questions:[],unseenCount:0,reusedCount:0};
  const seen=new Set(seenIds);
  const rank=(q:PracticeQuestion)=>hash(`${seed}:${seen.has(q.id)?'seen':'unseen'}:${q.id}`)+(seen.has(q.id)?2**32:0);
  const chosen=applyBlueprint(safePool,questionCount,rank);
  const questions=shuffle(chosen,`${seed}:question-order`).map(q=>{
    const optionOrder=shuffle(q.o.map((text,original)=>({text,original})),`${seed}:${q.id}:options`);
    return {...q,o:optionOrder.map(x=>x.text),a:optionOrder.findIndex(x=>x.original===q.a)};
  });
  const unseenCount=chosen.filter(q=>!seen.has(q.id)).length;
  return{id:`bha-${hash(seed).toString(36)}`,seed,questions,unseenCount,reusedCount:chosen.length-unseenCount};
}

export function historyKey(exam:string,subject:string){return `bha-cbt-history:${exam}:${subject}`}
export function readSeenQuestionIds(exam:string,subject:string){if(typeof window==='undefined')return[];try{const raw=localStorage.getItem(historyKey(exam,subject));const parsed=raw?JSON.parse(raw):[];return Array.isArray(parsed)?parsed.filter(x=>typeof x==='string'):[]}catch{return[]}}
export function rememberQuestions(exam:string,subject:string,ids:string[]){if(typeof window==='undefined')return;const merged=[...new Set([...readSeenQuestionIds(exam,subject),...ids])].slice(-2000);localStorage.setItem(historyKey(exam,subject),JSON.stringify(merged))}
