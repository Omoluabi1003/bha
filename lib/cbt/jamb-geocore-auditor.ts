import type {PracticeQuestion} from './nigerian-subjects';
import type {GeoCoreQuestion,GeoCoreMetadata,JambSubject} from './jamb-geocore';
import {manifestFor} from './jamb-geocore-manifest';
import {validateQuestion} from './question-validator';

export type GeoCoreAuditFinding={questionId:string;subject:string;status:'mapped'|'rejected'|'manual-review';domain?:string;reasons:string[]};

const normalize=(s:string)=>s.toLowerCase().replace(/[^a-z0-9À-ž\s]/g,' ').replace(/\s+/g,' ').trim();
function domainScore(q:PracticeQuestion,domain:string){
 const hay=normalize(`${q.topic} ${q.q}`),tokens=normalize(domain).split(' ').filter(x=>x.length>3);
 return tokens.reduce((n,t)=>n+(hay.includes(t)?1:0),0);
}

export function auditQuestionForGeoCore(question:PracticeQuestion,bank:PracticeQuestion[]):GeoCoreAuditFinding{
 const manifest=manifestFor(question.subject);
 if(!manifest)return {questionId:question.id,subject:question.subject,status:'rejected',reasons:['Subject is not in the canonical JAMB UTME manifest.']};
 const structural=validateQuestion(question,bank.filter(q=>q.id!==question.id));
 if(!structural.ok)return {questionId:question.id,subject:question.subject,status:'rejected',reasons:structural.reasons};
 const ranked=manifest.domains.map(d=>({d,score:domainScore(question,d.name)})).sort((a,b)=>b.score-a.score);
 if(!ranked[0]||ranked[0].score===0)return {questionId:question.id,subject:question.subject,status:'manual-review',reasons:['No syllabus domain can be assigned safely from question/topic text. Human academic mapping is required.']};
 return {questionId:question.id,subject:question.subject,status:'mapped',domain:ranked[0].d.name,reasons:['Structurally valid and mapped to a current GeoCore syllabus domain. Academic answer verification is still required before certification.']};
}

export function attachMappedGeoCore(question:PracticeQuestion,finding:GeoCoreAuditFinding):GeoCoreQuestion{
 if(finding.status!=='mapped'||!finding.domain)return question;
 const manifest=manifestFor(question.subject)!;
 const domain=manifest.domains.find(d=>d.name===finding.domain)!;
 const geocore:GeoCoreMetadata={syllabusVersion:manifest.syllabusVersion,syllabusTopic:domain.name,syllabusObjective:domain.objective,sourceAuthority:'JAMB IBASS',sourceUrl:manifest.syllabusUrl,status:'mapped',notes:'Machine-assisted mapping only. Requires independent academic review before certification.'};
 return {...question,geocore};
}

export function auditSubjectBank(subject:JambSubject,bank:PracticeQuestion[]){
 const findings=bank.map(q=>auditQuestionForGeoCore({...q,subject},bank));
 return {subject,total:bank.length,mapped:findings.filter(x=>x.status==='mapped').length,rejected:findings.filter(x=>x.status==='rejected').length,manualReview:findings.filter(x=>x.status==='manual-review').length,findings};
}
