import {JAMB_UTME_SUBJECTS,type JambSubject} from './jamb-geocore';
import {questionsFor} from './nigerian-subjects';
import {auditSubjectBank} from './jamb-geocore-auditor';

export type GeoCoreReadinessRow={subject:JambSubject;required:number;bankTotal:number;mapped:number;manualReview:number;rejected:number;certified:number;productionReady:boolean};

export function jambGeoCoreReadiness():GeoCoreReadinessRow[]{
 return JAMB_UTME_SUBJECTS.map(subject=>{
  const bank=questionsFor(subject),audit=auditSubjectBank(subject,bank),required=subject==='Use of English'?60:40;
  // Certification is deliberately zero until academic review writes explicit certified metadata.
  const certified=0;
  return {subject,required,bankTotal:bank.length,mapped:audit.mapped,manualReview:audit.manualReview,rejected:audit.rejected,certified,productionReady:certified>=required};
 });
}

export function geoCoreMigrationComplete(){return jambGeoCoreReadiness().every(x=>x.productionReady);}
