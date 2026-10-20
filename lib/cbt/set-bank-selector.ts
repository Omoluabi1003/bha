import type {PracticeQuestion} from './nigerian-subjects';
import {questionsForNumberedSet} from './numbered-set-selector';
export function selectCompleteQuestionSet(exam:string,subject:string,setNumber:number,bank:PracticeQuestion[]){const questions=questionsForNumberedSet(exam,subject,bank,setNumber);return {setNumber,questions};}
