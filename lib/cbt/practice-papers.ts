import {PracticeQuestion} from './nigerian-subjects';
import {buildAdaptiveExam,readSeenQuestionIds} from './adaptive-exam';

export const PRACTICE_PAPER_COUNT=40;

/** Compatibility entry point. Each slot creates a fresh paper and favors unseen verified questions. */
export function buildPracticePaper(pool:PracticeQuestion[],questionCount:number,setNumber:number,exam='',subject=''){
  if(pool.length<questionCount)return [];
  const safeSet=Math.min(PRACTICE_PAPER_COUNT,Math.max(1,Math.trunc(setNumber)));
  const entropy=`${safeSet}:${Date.now()}:${Math.random()}`;
  const seen=exam&&subject?readSeenQuestionIds(exam,subject):[];
  return buildAdaptiveExam(pool,questionCount,seen,entropy).questions;
}
