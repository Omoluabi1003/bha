import type {PracticeQuestion} from './nigerian-subjects';

export type QuestionSet={
  setNumber:number;
  questions:PracticeQuestion[];
};

export function hasCompleteQuestionSet(pool:PracticeQuestion[],questionCount:number){
  return questionCount>0&&pool.length>=questionCount;
}

export function validateQuestionSet(set:QuestionSet,questionCount:number){
  if(set.questions.length!==questionCount)return false;
  const ids=new Set(set.questions.map(question=>question.id));
  return ids.size===questionCount;
}

export function validatePublishedSets(sets:QuestionSet[],questionCount:number){
  return sets.every(set=>validateQuestionSet(set,questionCount));
}
