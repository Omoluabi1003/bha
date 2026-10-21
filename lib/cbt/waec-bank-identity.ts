import {questionsFor,subjectCatalog} from './nigerian-subjects';

/** Detect accidental cross-subject ID collisions before adaptive-history data is persisted. */
export function auditWaecQuestionIds(){
 const owners=new Map<string,string>();
 const collisions:{id:string;firstSubject:string;secondSubject:string}[]=[];
 for(const subject of subjectCatalog.WAEC)for(const question of questionsFor(subject)){
  const first=owners.get(question.id);
  if(first&&first!==subject)collisions.push({id:question.id,firstSubject:first,secondSubject:subject});
  else owners.set(question.id,subject);
 }
 return {valid:collisions.length===0,collisions};
}
