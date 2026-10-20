import type {PracticeQuestion} from './nigerian-subjects';
import {questionsForNumberedSet} from './numbered-set-selector';
export function numberedQuestionSet(exam:string,subject:string,bank:PracticeQuestion[],setNumber:number){return {setNumber,questions:questionsForNumberedSet(exam,subject,bank,setNumber)};}
