import {waecFinalStructuralCheck} from './waec-final-check';
export function isWaecStructurallyReleaseReady(){const x=waecFinalStructuralCheck();return x.summary.ready&&x.findings.length===0;}
