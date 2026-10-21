import {questionsFor,subjectCatalog} from './nigerian-subjects';
import {verifiedPool,validateCandidateBatch} from './question-validator';

export function waecBankHealth(){return subjectCatalog.WAEC.map(subject=>{
 const raw=questionsFor(subject);
 const checked=validateCandidateBatch(raw);
 const accepted=verifiedPool(raw);
 return {subject,raw:raw.length,accepted:accepted.length,rejected:checked.rejected.map(x=>({id:x.question.id,reasons:x.validation.reasons}))};
});}
