import {WaecAcademicEvidence,waecAcademicEvidenceComplete} from './waec-source-contract';
export function auditWaecAcademicEvidence(items:WaecAcademicEvidence[]){return{total:items.length,complete:items.filter(waecAcademicEvidenceComplete).length,pending:items.filter(x=>!waecAcademicEvidenceComplete(x))};}
