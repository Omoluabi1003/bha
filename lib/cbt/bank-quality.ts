import type {PracticeQuestion} from './nigerian-subjects';

const syntheticSetMarker=/\[(?:Set)\s+\d+\]|\(Practice set\s+\d+\)/i;

export function hasSyntheticSetPadding(pool:PracticeQuestion[]){
  return pool.some(question=>syntheticSetMarker.test(question.q));
}

export function isBankEligibleForSets(pool:PracticeQuestion[],questionCount:number){
  if(pool.length<questionCount)return false;
  if(hasSyntheticSetPadding(pool))return false;
  const ids=new Set(pool.map(question=>question.id));
  return ids.size===pool.length;
}
