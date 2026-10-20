import {PracticeQuestion} from './nigerian-subjects';
import {questionSimilarity,validateQuestion} from './question-validator';

export type CandidateStatus='draft'|'rejected'|'review'|'approved';
export type Difficulty='easy'|'medium'|'hard';
export type AuthoredCandidate={question:PracticeQuestion;source:'ai'|'human';status:CandidateStatus;syllabusRef:string;difficulty:Difficulty;rationale:string;createdAt:number};
export type CandidateReview={status:CandidateStatus;reasons:string[];checks:{structure:boolean;syllabus:boolean;rationale:boolean;duplication:boolean;language:boolean}};

const languageSubjects=new Set(['Igbo','Yoruba','Hausa','French','Arabic']);
const normalized=(value:string)=>value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();

function languageCheck(candidate:AuthoredCandidate){
  if(!languageSubjects.has(candidate.question.subject))return true;
  const body=[candidate.question.q,...candidate.question.o].join(' ').trim();
  if(body.length<30)return false;
  // This is intentionally conservative. It rejects obviously empty/placeholder language items,
  // while fluent/native correctness remains a required human academic-review responsibility.
  const placeholder=/\b(practice|sample question|placeholder|question \d+)\b/i;
  return !placeholder.test(body);
}

/** BHA quarantine gate. Passing here means eligible for academic review, never auto-approved. */
export function reviewAuthoredCandidate(candidate:AuthoredCandidate,verifiedBank:PracticeQuestion[]):CandidateReview{
  const reasons:string[]=[];
  const structural=validateQuestion(candidate.question,verifiedBank);
  if(!structural.valid)reasons.push(...structural.reasons);
  const syllabus=Boolean(candidate.syllabusRef.trim());if(!syllabus)reasons.push('Missing syllabus mapping');
  const rationale=Boolean(candidate.rationale.trim()&&candidate.rationale.trim().length>=12);if(!rationale)reasons.push('Missing or inadequate answer rationale');
  const duplication=!verifiedBank.some(x=>x.id!==candidate.question.id&&questionSimilarity(x.q,candidate.question.q)>=0.72);if(!duplication)reasons.push('Semantic overlap with verified bank is too high');
  const language=languageCheck(candidate);if(!language)reasons.push('Language candidate requires authentic subject-specific wording');
  if(!['easy','medium','hard'].includes(candidate.difficulty))reasons.push('Invalid difficulty');
  const options=candidate.question.o.map(normalized);if(new Set(options).size!==options.length)reasons.push('Duplicate answer options');
  return {status:reasons.length?'rejected':'review',reasons,checks:{structure:structural.valid,syllabus,rationale,duplication,language}};
}

export function approveCandidate(candidate:AuthoredCandidate,review:CandidateReview):AuthoredCandidate{
  if(candidate.status!=='review'||review.status!=='review'||review.reasons.length)throw new Error('Candidate has not passed academic review gates');
  return {...candidate,status:'approved'};
}

export function approvedQuestions(candidates:AuthoredCandidate[]):PracticeQuestion[]{return candidates.filter(x=>x.status==='approved').map(x=>x.question)}
