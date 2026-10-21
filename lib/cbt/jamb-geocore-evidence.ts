import type {GeoCoreMetadata,GeoCoreQuestion,JambSubject} from './jamb-geocore';
import type {GeoCoreSubjectProfile} from './jamb-geocore-core-subjects';

export type ReviewEvidence={
  questionId:string;
  subject:JambSubject;
  syllabusVersion:'JAMB 2026';
  syllabusTopic:string;
  syllabusObjective:string;
  syllabusSourceUrl:string;
  answerVerified:boolean;
  syllabusVerified:boolean;
  languageVerified?:boolean;
  prescribedMaterialVerified?:boolean;
  computationVerified?:boolean;
  reviewer:string;
  reviewedAt:string;
  decision:'certified'|'rejected';
  notes?:string;
};

export function objectiveExists(profile:GeoCoreSubjectProfile|undefined,evidence:ReviewEvidence){
  if(!profile)return false;
  return profile.domains.some(domain=>domain.topic===evidence.syllabusTopic&&domain.sourceUrl===evidence.syllabusSourceUrl&&domain.objectives.includes(evidence.syllabusObjective));
}

export function evidenceCanCertify(question:GeoCoreQuestion,evidence:ReviewEvidence,profile?:GeoCoreSubjectProfile){
  if(question.id!==evidence.questionId||question.subject!==evidence.subject)return false;
  if(evidence.decision!=='certified'||!evidence.answerVerified||!evidence.syllabusVerified)return false;
  if(!evidence.reviewer.trim()||!evidence.reviewedAt)return false;
  if(profile&&!objectiveExists(profile,evidence))return false;
  if((evidence.subject==='Mathematics'||evidence.subject==='Physics'||evidence.subject==='Chemistry')&&evidence.computationVerified!==true)return false;
  if(['Igbo','Yoruba','Hausa','Arabic','French'].includes(evidence.subject)&&evidence.languageVerified!==true)return false;
  if(evidence.subject==='Literature-in-English'&&evidence.prescribedMaterialVerified!==true)return false;
  return true;
}

export function metadataFromEvidence(evidence:ReviewEvidence):GeoCoreMetadata{
  return {
    syllabusVersion:evidence.syllabusVersion,
    syllabusTopic:evidence.syllabusTopic,
    syllabusObjective:evidence.syllabusObjective,
    sourceAuthority:'JAMB IBASS',
    sourceUrl:evidence.syllabusSourceUrl,
    status:evidence.decision,
    reviewedAt:evidence.reviewedAt,
    reviewer:evidence.reviewer,
    answerVerified:evidence.answerVerified,
    syllabusVerified:evidence.syllabusVerified,
    computationVerified:evidence.computationVerified,
    languageVerified:evidence.languageVerified,
    prescribedMaterialVerified:evidence.prescribedMaterialVerified,
    notes:evidence.notes
  };
}
