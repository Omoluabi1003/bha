import type {PracticeQuestion} from './nigerian-subjects';
export function bankSliceForSet(bank:PracticeQuestion[],setNumber:number,questionsPerSet:number){const start=(setNumber-1)*questionsPerSet;return bank.slice(start,start+questionsPerSet);}
