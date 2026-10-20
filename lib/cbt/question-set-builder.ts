import type {PracticeQuestion} from './nigerian-subjects';
import {buildQuestionSet} from './session-builder';

export type NumberedQuestionSet={setNumber:number;questions:PracticeQuestion[]};

/**
 * Builds numbered CBT sets. Each selector points to a complete 40/50/60-question
 * set, never to a single question. The source bank must contain enough distinct
 * approved questions to build every requested set without recycling records.
 */
export function buildNumberedQuestionSets(bank:PracticeQuestion[],setCount:number,questionsPerSet:number):NumberedQuestionSet[]{
 if(!Number.isInteger(setCount)||setCount<1)throw new Error('Set count must be a positive integer.');
 const required=setCount*questionsPerSet;
 if(bank.length<required)throw new Error(`Question bank requires ${required} distinct approved questions for ${setCount} sets of ${questionsPerSet}.`);
 const shuffled=buildQuestionSet(bank,required);
 return Array.from({length:setCount},(_,index)=>({
  setNumber:index+1,
  questions:shuffled.slice(index*questionsPerSet,(index+1)*questionsPerSet),
 }));
}
