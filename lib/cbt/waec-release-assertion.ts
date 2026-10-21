import {waecReleaseSummary} from './waec-release-summary';
export function assertWaecStructurallyReady(){const summary=waecReleaseSummary();if(!summary.ready)throw new Error(`WAEC CBT structurally blocked: ${summary.incompleteSubjects.join(', ')||'catalog or question-ID integrity failure'}`);return summary;}
