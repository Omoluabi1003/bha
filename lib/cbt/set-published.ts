import {setPolicy} from './set-policy';
export function publishedSetCount(exam:string,subject:string,approvedBankSize:number){return Math.floor(approvedBankSize/setPolicy(exam,subject).questionsPerSet);}
