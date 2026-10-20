export function questionSetLockState(available:boolean){return {locked:!available,status:available?'READY':'BANK_IN_REVIEW'} as const;}
