import type {PracticeQuestion} from './nigerian-subjects';

export const JAMB_UTME_SUBJECTS = [
  'Agriculture','Arabic','Art','Biology','Chemistry','Christian Religious Studies','Commerce','Economics','French','Geography','Government','Hausa','History','Home Economics','Igbo','Islamic Studies','Literature-in-English','Mathematics','Music','Physics','Principles of Accounts','Use of English','Yoruba','Computer Studies','Physical and Health Education'
] as const;
export type JambSubject = typeof JAMB_UTME_SUBJECTS[number];

export type GeoCoreStatus='unmapped'|'mapped'|'reviewed'|'certified'|'rejected';
export type GeoCoreMetadata={
  syllabusVersion:string;
  syllabusTopic:string;
  syllabusObjective:string;
  sourceAuthority:'JAMB IBASS';
  sourceUrl:string;
  materialsUrl?:string;
  status:GeoCoreStatus;
  answerVerified?:boolean;
  syllabusVerified?:boolean;
  languageVerified?:boolean;
  prescribedMaterialVerified?:boolean;
  reviewedAt?:string;
  reviewer?:string;
  notes?:string;
};

export const JAMB_2026_SOURCE={
  subjectList:'https://www.jamb.gov.ng/PDFs/2026/2026%20TRAINING%20MANUAL%20%20final.pdf',
  syllabus:'https://ibass.jamb.gov.ng/e-syllabus',
  materials:'https://ibass.jamb.gov.ng/materials'
} as const;

export type GeoCoreQuestion=PracticeQuestion&{geocore?:GeoCoreMetadata};

export function geocoreReady(question:GeoCoreQuestion){
  const g=question.geocore;
  return Boolean(g&&g.sourceAuthority==='JAMB IBASS'&&g.syllabusVersion&&g.syllabusTopic&&g.syllabusObjective&&g.sourceUrl&&g.status==='certified'&&g.answerVerified===true&&g.syllabusVerified===true&&g.reviewer&&g.reviewedAt);
}

export function auditGeoCoreBank(subject:string,questions:GeoCoreQuestion[]){
  const certified=questions.filter(geocoreReady).length;
  const rejected=questions.filter(q=>q.geocore?.status==='rejected').length;
  const mapped=questions.filter(q=>q.geocore&&q.geocore.status!=='unmapped').length;
  const reviewed=questions.filter(q=>q.geocore?.status==='reviewed'||q.geocore?.status==='certified').length;
  return {subject,total:questions.length,mapped,reviewed,certified,rejected,pending:questions.length-certified-rejected,certificationPercent:questions.length?Math.round(certified/questions.length*100):0};
}
