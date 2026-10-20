import {PracticeQuestion} from './nigerian-subjects';
import {validateQuestionCandidate} from './question-validator';

export type CandidateStatus='draft'|'rejected'|'review'|'approved';
export type AuthoredCandidate={question:PracticeQuestion;source:'ai'|'human';status:CandidateStatus;syllabusRef:string;difficulty:'easy'|'medium'|'hard';rationale:string;createdAt:number};
export type CandidateReview={status:CandidateStatus;reasons:string[]};

/**
 * BHA authoring safety gate. AI output is never used directly in a live exam.
 * Candidates must satisfy deterministic checks and remain in review until approved.
 */
export function reviewAuthoredCandidate(candidate:AuthoredCandidate,verifiedBank:PracticeQuestion[]):CandidateReview{
  const reasons:string[]=[];
  const structural=validateQuestionCandidate(candidate.question,verifiedBank);
  if(!structural.valid)reasons.push(...structural.reasons);
  if(!candidate.syllabusRef.trim())reasons.push('Missing syllabus mapping');
  if(!candidate.rationale.trim())reasons.push('Missing answer rationale');
  if(!['easy','medium','hard'].includes(candidate.difficulty))reasons.push('Invalid difficulty');
  if(candidate.question.q.trim().length<12)reasons.push('Question wording is too short');
  if(candidate.question.o.some(x=>x.trim().length===0))reasons.push('Empty answer option');
  if(new Set(candidate.question.o.map(x=>x.trim().toLowerCase())).size!==candidate.question.o.length)reasons.push('Duplicate answer options');
  return reasons.length?{status:'rejected',reasons}:{status:'review',reasons:[]};
}

export function approveCandidate(candidate:AuthoredCandidate):AuthoredCandidate{
  if(candidate.status!=='review')throw new Error('Only reviewed candidates can be approved');
  return {...candidate,status:'approved'};
}

export function approvedQuestions(candidates:AuthoredCandidate[]):PracticeQuestion[]{
  return candidates.filter(x=>x.status==='approved').map(x=>x.question);
}
