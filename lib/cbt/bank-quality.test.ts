import {hasSyntheticSetPadding,isBankEligibleForSets} from './bank-quality';
import type {PracticeQuestion} from './nigerian-subjects';
const q=(id:string,text:string):PracticeQuestion=>({id,subject:'Test',topic:'Integrity',q:text,o:['A','B','C','D'],a:0});
export function bankQualitySelfCheck(){
 const clean=Array.from({length:40},(_,i)=>q(`q-${i+1}`,`Unique question ${i+1}`));
 const padded=[...clean.slice(0,39),q('q-40','Repeated item [Set 2]')];
 if(!isBankEligibleForSets(clean,40))throw new Error('Complete clean bank should be eligible.');
 if(!hasSyntheticSetPadding(padded))throw new Error('Synthetic set padding must be detected.');
 if(isBankEligibleForSets(padded,40))throw new Error('Synthetic padded bank must be blocked.');
 return true;
}
