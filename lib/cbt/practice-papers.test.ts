import {describe,expect,it} from 'vitest';
import {buildPracticePaper,PRACTICE_PAPER_COUNT} from './practice-papers';
import {PracticeQuestion} from './nigerian-subjects';

const pool:PracticeQuestion[]=Array.from({length:100},(_,i)=>({id:`q-${i+1}`,subject:'Mathematics',topic:'Test',q:`Question ${i+1}`,o:['A','B','C','D'],a:0}));

describe('practice paper sets',()=>{
  it('exposes forty paper slots',()=>expect(PRACTICE_PAPER_COUNT).toBe(40));
  it('builds the configured number of unique questions',()=>{const paper=buildPracticePaper(pool,40,1);expect(paper).toHaveLength(40);expect(new Set(paper.map(q=>q.id)).size).toBe(40)});
  it('keeps a numbered set stable',()=>expect(buildPracticePaper(pool,40,7).map(q=>q.id)).toEqual(buildPracticePaper(pool,40,7).map(q=>q.id)));
  it('returns no partial paper when the bank is too small',()=>expect(buildPracticePaper(pool.slice(0,20),40,1)).toEqual([]));
});
