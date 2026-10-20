import {PracticeQuestion} from './nigerian-subjects';

export type ValidationResult={valid:boolean;reasons:string[]};

/** Safety gate for verified and future AI-authored questions. AI output must pass
 * this gate before it can enter a live BHA examination pool. */
export function validateQuestion(q:PracticeQuestion):ValidationResult{
  const reasons:string[]=[];
  if(!q.id?.trim())reasons.push('missing id');
  if(!q.subject?.trim())reasons.push('missing subject');
  if(!q.topic?.trim())reasons.push('missing topic');
  if(!q.q?.trim()||q.q.trim().length<8)reasons.push('question too short');
  if(!Array.isArray(q.o)||q.o.length!==4)reasons.push('requires exactly four options');
  if(!Number.isInteger(q.a)||q.a<0||q.a>3)reasons.push('invalid correct answer index');
  const normalized=(q.o??[]).map(x=>x.trim().toLowerCase());
  if(new Set(normalized).size!==normalized.length)reasons.push('duplicate options');
  if(normalized.some(x=>!x))reasons.push('empty option');
  return{valid:reasons.length===0,reasons};
}

export function verifiedPool(pool:PracticeQuestion[]){return pool.filter(q=>validateQuestion(q).valid)}
