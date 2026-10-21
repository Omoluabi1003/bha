import {waecReleaseSummary} from './waec-release-summary';
import {WaecAuditFinding} from './waec-audit-types';
export function waecStructuralFindings():WaecAuditFinding[]{const s=waecReleaseSummary(),out:WaecAuditFinding[]=[];for(const x of s.incompleteSubjects)out.push({severity:'blocker',message:`Incomplete validator-accepted bank: ${x}`});if(!s.catalogValid)out.push({severity:'blocker',message:'WAEC catalog differs from the 2026/2027 profile'});if(!s.idIntegrity)out.push({severity:'blocker',message:'Cross-subject question ID collision detected'});return out;}
