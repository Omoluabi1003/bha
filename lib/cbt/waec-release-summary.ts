import {waecReleaseReport} from './waec-release-report';
export function waecReleaseSummary(){const r=waecReleaseReport();return{ready:r.ready,totalSubjects:r.readiness.length,readySubjects:r.readiness.filter(x=>x.ready).length,incompleteSubjects:r.incomplete.map(x=>`${x.subject} ${x.available}/${x.required}`),catalogValid:r.catalog.valid,idIntegrity:r.questionIds.valid};}
