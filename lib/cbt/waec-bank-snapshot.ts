import {auditWaecReadiness} from './waec-readiness-audit';
export function waecBankSnapshot(){return Object.fromEntries(auditWaecReadiness().map(x=>[x.subject,{accepted:x.available,required:x.required,ready:x.ready}]));}
