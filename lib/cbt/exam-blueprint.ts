import {PracticeQuestion} from './nigerian-subjects';

type TopicBucket={topic:string;count:number};

/**
 * Builds a proportional topic blueprint from the verified pool. This prevents
 * a fresh exam from accidentally overloading one topic simply because of random selection.
 */
export function buildTopicBlueprint(pool:PracticeQuestion[],questionCount:number):TopicBucket[]{
  const topics=[...new Set(pool.map(q=>q.topic).filter(Boolean))];
  if(!topics.length)return[];
  const base=Math.floor(questionCount/topics.length),extra=questionCount%topics.length;
  return topics.map((topic,i)=>({topic,count:base+(i<extra?1:0)}));
}

export function applyBlueprint(pool:PracticeQuestion[],questionCount:number,rank:(q:PracticeQuestion)=>number){
  const blueprint=buildTopicBlueprint(pool,questionCount),chosen:PracticeQuestion[]=[];
  for(const bucket of blueprint){chosen.push(...pool.filter(q=>q.topic===bucket.topic).sort((a,b)=>rank(a)-rank(b)).slice(0,bucket.count))}
  if(chosen.length<questionCount){const used=new Set(chosen.map(q=>q.id));chosen.push(...pool.filter(q=>!used.has(q.id)).sort((a,b)=>rank(a)-rank(b)).slice(0,questionCount-chosen.length))}
  return chosen.slice(0,questionCount);
}
