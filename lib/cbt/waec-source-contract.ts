export type WaecAcademicEvidence={questionId:string;subject:string;syllabusTopic:string;answerVerified:boolean;reviewer?:string;reviewedAt?:string;prescribedTextVersion?:string};
export function waecAcademicEvidenceComplete(e:WaecAcademicEvidence){return Boolean(e.questionId&&e.subject&&e.syllabusTopic&&e.answerVerified&&e.reviewer&&e.reviewedAt);}
