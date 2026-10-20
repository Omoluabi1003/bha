import {PracticeQuestion} from './nigerian-subjects';

export type RemoteAdaptiveHistory={authenticated:boolean;seenQuestionIds:string[];weakTopics:string[]};

export async function fetchRemoteAdaptiveHistory(exam:string,subject:string):Promise<RemoteAdaptiveHistory|null>{
  try{
    const response=await fetch(`/api/cbt/history?exam=${encodeURIComponent(exam)}&subject=${encodeURIComponent(subject)}`,{cache:'no-store'});
    if(!response.ok)return null;
    const data=await response.json();
    return {authenticated:Boolean(data.authenticated),seenQuestionIds:Array.isArray(data.seenQuestionIds)?data.seenQuestionIds:[],weakTopics:Array.isArray(data.weakTopics)?data.weakTopics:[]};
  }catch{return null;}
}

export async function persistAdaptiveAttempt(input:{exam:string;subject:string;mode:'practice'|'simulation';sessionId:string;score:number;total:number;unanswered:number;timedOut:boolean;attentionChanges:number;clipboardAttempts:number;questions:PracticeQuestion[];answers:Record<number,number>}):Promise<boolean>{
  try{
    const response=await fetch('/api/cbt/history',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({exam:input.exam,subject:input.subject,mode:input.mode,sessionId:input.sessionId,score:input.score,total:input.total,unanswered:input.unanswered,timedOut:input.timedOut,attentionChanges:input.attentionChanges,clipboardAttempts:input.clipboardAttempts,questions:input.questions.map((q,i)=>({questionId:q.id,topic:q.topic||'General',correct:input.answers[i]===q.a}))})});
    return response.ok;
  }catch{return false;}
}
