export type CBTSetStatus='READY'|'BANK_IN_REVIEW';
export function cbtSetStatus(available:boolean):CBTSetStatus{return available?'READY':'BANK_IN_REVIEW';}
