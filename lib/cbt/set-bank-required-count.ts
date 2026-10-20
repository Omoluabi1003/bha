import {setPolicy} from './set-policy';export function requiredQuestionsForSet(exam:string,subject:string){return setPolicy(exam,subject).questionsPerSet;}
