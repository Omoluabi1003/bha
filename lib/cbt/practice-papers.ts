import {PracticeQuestion} from './nigerian-subjects';

export const PRACTICE_PAPER_COUNT=40;

function hash(value:string){let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

/**
 * Produces a stable paper for a given set number. The same subject bank and set
 * always produce the same question order, so a learner can return to Set 12
 * and receive Set 12 again rather than a freshly randomized session.
 *
 * Sets may share questions until the verified bank is large enough to supply
 * 40 fully disjoint papers. We never duplicate a question inside one paper.
 */
export function buildPracticePaper(pool:PracticeQuestion[],questionCount:number,setNumber:number){
  if(pool.length<questionCount)return [];
  const safeSet=Math.min(PRACTICE_PAPER_COUNT,Math.max(1,Math.trunc(setNumber)));
  return [...pool]
    .sort((a,b)=>hash(`${safeSet}:${a.id}`)-hash(`${safeSet}:${b.id}`))
    .slice(0,questionCount);
}
