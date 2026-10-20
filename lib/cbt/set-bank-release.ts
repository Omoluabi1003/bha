export function releaseStatus(complete:boolean){return complete?'RELEASED' as const:'BANK_IN_REVIEW' as const;}
