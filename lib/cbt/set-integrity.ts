import type {PracticeQuestion} from './nigerian-subjects';

export function validateDistinctSetQuestions(sets:PracticeQuestion[][]){
 const all=sets.flat();
 const ids=new Set(all.map(q=>q.id));
 const stems=new Set(all.map(q=>q.q.trim().toLowerCase().replace(/\s+/g,' ')));
 if(ids.size!==all.length||stems.size!==all.length)throw new Error('CBT numbered sets contain recycled questions.');
 return true;
}
