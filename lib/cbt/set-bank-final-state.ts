export function finalSetState(number:number,count:number,ready:boolean){return {setNumber:number,questions:count,status:ready?'READY' as const:'BANK_IN_REVIEW' as const};}
