import type {PracticeQuestion} from './nigerian-subjects';
import {setPolicy} from './set-policy';

export type SetAvailability={setNumber:number;available:boolean;start:number;end:number};

/**
 * Returns only genuinely supportable numbered sets. A set is available only
 * when the bank contains the complete 40/50/60-question slice for it.
 */
export function numberedSetAvailability(exam:string,subject:string,bank:PracticeQuestion[],requestedSets:number):SetAvailability[]{
 const {questionsPerSet}=setPolicy(exam,subject);
 return Array.from({length:requestedSets},(_,i)=>{
  const start=i*questionsPerSet;
  const end=start+questionsPerSet;
  return {setNumber:i+1,available:bank.length>=end,start,end};
 });
}
