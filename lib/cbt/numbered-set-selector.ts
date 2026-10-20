import type {PracticeQuestion} from './nigerian-subjects';
import {setPolicy} from './set-policy';

/** Resolves one outer numbered selector to its complete question set. */
export function questionsForNumberedSet(exam:string,subject:string,bank:PracticeQuestion[],setNumber:number):PracticeQuestion[]{
 if(!Number.isInteger(setNumber)||setNumber<1)throw new Error('Invalid question set number.');
 const {questionsPerSet}=setPolicy(exam,subject);
 const start=(setNumber-1)*questionsPerSet;
 const end=start+questionsPerSet;
 if(bank.length<end)throw new Error(`Question Set ${setNumber} is still in review. ${questionsPerSet} distinct questions are required.`);
 return bank.slice(start,end);
}
