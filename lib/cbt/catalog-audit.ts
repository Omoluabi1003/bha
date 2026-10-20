import {subjectCatalog,questionsFor} from './nigerian-subjects';
import {getSessionConfig} from './session-config';

export type CatalogGap={exam:string;subject:string;available:number;required:number};
export function auditCBTCatalog():CatalogGap[]{
 const gaps:CatalogGap[]=[];
 for(const [exam,subjects] of Object.entries(subjectCatalog))for(const subject of subjects){
  const required=getSessionConfig(exam,subject).questionCount;
  const available=questionsFor(subject).length;
  if(available<required)gaps.push({exam,subject,available,required});
 }
 return gaps;
}
