import type {CBTBankHealth} from './set-bank-health';
export function bankHealth(approvedQuestions:number,questionsPerSet:number):CBTBankHealth{const completeSets=Math.floor(approvedQuestions/questionsPerSet);return {approvedQuestions,completeSets,questionsPerSet,healthy:completeSets>0};}
