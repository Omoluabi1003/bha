export type SetPolicy={questionsPerSet:number};

export function setPolicy(exam:string,subject:string):SetPolicy{
 if(exam==='JAMB')return {questionsPerSet:subject==='Use of English'?60:40};
 if(exam==='WAEC'||exam==='NECO'||exam==='BHA INTERNAL')return {questionsPerSet:50};
 return {questionsPerSet:50};
}
