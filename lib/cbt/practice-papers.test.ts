import {buildPracticePaper,PRACTICE_PAPER_COUNT} from './practice-papers';
import {PracticeQuestion} from './nigerian-subjects';

// Dependency-free validation fixture for the practice-paper builder.
const pool:PracticeQuestion[]=Array.from({length:100},(_,i)=>({id:`q-${i+1}`,subject:'Mathematics',topic:'Test',q:`Question ${i+1}`,o:['A','B','C','D'],a:0}));
export const practicePaperValidation={
  setCount:PRACTICE_PAPER_COUNT===40,
  fullPaper:buildPracticePaper(pool,40,1).length===40,
  uniqueWithinPaper:new Set(buildPracticePaper(pool,40,1).map(q=>q.id)).size===40,
  stableSet:buildPracticePaper(pool,40,7).map(q=>q.id).join('|')===buildPracticePaper(pool,40,7).map(q=>q.id).join('|'),
  refusesPartial:buildPracticePaper(pool.slice(0,20),40,1).length===0,
};
