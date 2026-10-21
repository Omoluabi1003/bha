import {waecReleaseSummary} from './waec-release-summary';
import {waecStructuralFindings} from './waec-audit-findings';
export function waecFinalStructuralCheck(){return{summary:waecReleaseSummary(),findings:waecStructuralFindings()};}
