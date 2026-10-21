import {waecReleaseReport} from './waec-release-report';

export type WaecStructuralStatus='ready'|'blocked';
export function waecStructuralStatus():{status:WaecStructuralStatus;report:ReturnType<typeof waecReleaseReport>}{
 const report=waecReleaseReport();
 return {status:report.ready?'ready':'blocked',report};
}

// IMPORTANT: structural readiness is not academic certification. A question still
// requires syllabus/answer/prescribed-material review before being called WAEC-certified.
