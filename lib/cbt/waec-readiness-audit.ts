import {questionsFor,subjectCatalog} from './nigerian-subjects';
import {verifiedPool} from './question-validator';
import {getSessionConfig} from './session-config';

export type WaecReadinessRow={subject:string;required:number;available:number;ready:boolean};

/** Single source of truth for checking every current BHA WAEC card before release. */
export function auditWaecReadiness():WaecReadinessRow[]{
  return subjectCatalog.WAEC.map(subject=>{
    const required=getSessionConfig('WAEC',subject).questionCount;
    const available=verifiedPool(questionsFor(subject)).length;
    return {subject,required,available,ready:available>=required};
  });
}

export function waecReadinessFailures(){return auditWaecReadiness().filter(row=>!row.ready);}
