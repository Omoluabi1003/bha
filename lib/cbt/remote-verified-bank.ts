export type RemoteVerifiedQuestion={id:string;subject:string;topic:string;question:string;options:string[]};

// Remote verified questions deliberately do not conform to PracticeQuestion because
// PracticeQuestion contains the correct answer. This prevents accidental client-side
// scoring with database questions before the server-scored session path is ready.
export async function fetchRemoteVerifiedQuestions(exam:string,subject:string):Promise<RemoteVerifiedQuestion[]>{
  try{
    const params=new URLSearchParams({exam,subject});
    const response=await fetch(`/api/cbt/verified-questions?${params.toString()}`,{cache:'no-store'});
    if(!response.ok)return [];
    const payload=await response.json();
    if(!Array.isArray(payload?.questions))return [];
    return payload.questions.flatMap((row:any)=>{
      const options=Array.isArray(row?.options)?row.options.map(String):[];
      if(!row?.id||!row?.subject||!row?.topic||!row?.question_text||options.length!==4)return [];
      return [{id:String(row.id),subject:String(row.subject),topic:String(row.topic),question:String(row.question_text),options}];
    });
  }catch{return []}
}
