import type {PracticeQuestion} from './nigerian-subjects';
import {setPolicy} from './set-policy';

export function setReadiness(exam:string,subject:string,bank:PracticeQuestion[]){
 const {questionsPerSet}=setPolicy(exam,subject);
 const completeSets=Math.floor(bank.length/questionsPerSet);
 return {questionsPerSet,completeSets,remainingQuestions:bank.length%questionsPerSet};
}
