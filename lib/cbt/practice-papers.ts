import {PracticeQuestion} from './nigerian-subjects';
import {buildAdaptiveExam} from './adaptive-exam';

export const PRACTICE_PAPER_COUNT=40;

/**
 * Compatibility entry point for the existing 40-paper UI.
 * A numbered box now represents an exam slot, not a memorisable fixed booklet.
 * Opening it assembles a fresh, validated, topic-balanced paper. The selected
 * paper stays locked by React for the active sitting, while a later sitting can
 * receive a different composition and option order.
 */
export function buildPracticePaper(pool:PracticeQuestion[],questionCount:number,setNumber:number){
  if(pool.length<questionCount)return [];
  const entropy=`${Math.min(PRACTICE_PAPER_COUNT,Math.max(1,Math.trunc(setNumber)))}:${Date.now()}:${Math.random()}`;
  return buildAdaptiveExam(pool,questionCount,[],entropy).questions;
}
