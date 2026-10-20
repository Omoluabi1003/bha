import type {PracticeQuestion} from './nigerian-subjects';

/** Fisher-Yates shuffle. The caller persists the resulting IDs/order per attempt. */
export function shuffleQuestions(source:PracticeQuestion[]):PracticeQuestion[]{
 const items=[...source];
 for(let i=items.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  [items[i],items[j]]=[items[j],items[i]];
 }
 return items;
}

/**
 * Builds one professional CBT question set. Every numbered selector in the UI
 * maps to exactly one member of this returned array.
 */
export function buildQuestionSet(bank:PracticeQuestion[],required:number):PracticeQuestion[]{
 if(!Number.isInteger(required)||required<1)throw new Error('Question count must be a positive integer.');
 const ids=new Set(bank.map(q=>q.id));
 const stems=new Set(bank.map(q=>q.q.trim().toLowerCase().replace(/\s+/g,' ')));
 if(ids.size!==bank.length||stems.size!==bank.length)throw new Error('Question bank contains duplicate records.');
 if(bank.length<required)throw new Error(`Question bank requires ${required} distinct questions but only ${bank.length} are approved.`);
 return shuffleQuestions(bank).slice(0,required);
}
