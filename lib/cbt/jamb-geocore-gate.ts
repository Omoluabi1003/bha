import type {PracticeQuestion} from './nigerian-subjects';
import {auditGeoCoreBank,geocoreReady,JAMB_UTME_SUBJECTS,type GeoCoreQuestion} from './jamb-geocore';

export function isJambSubject(subject:string){return (JAMB_UTME_SUBJECTS as readonly string[]).includes(subject)}

/**
 * Strict certification filter for the production GeoCore migration.
 * Keep this separate from the current legacy bank selector until the audit has
 * certified enough material, so incomplete metadata cannot silently erase CBT coverage.
 */
export function certifiedJambQuestions(subject:string,questions:PracticeQuestion[]){
  if(!isJambSubject(subject))return questions;
  return (questions as GeoCoreQuestion[]).filter(geocoreReady);
}

export function jambCertificationReport(subject:string,questions:PracticeQuestion[]){
  return auditGeoCoreBank(subject,questions as GeoCoreQuestion[]);
}

export function jambBankCanGraduate(subject:string,questions:PracticeQuestion[]){
  if(!isJambSubject(subject))return true;
  const required=subject==='Use of English'?60:40;
  return certifiedJambQuestions(subject,questions).length>=required;
}
