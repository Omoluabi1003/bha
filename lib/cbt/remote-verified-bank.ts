import type {PracticeQuestion} from './nigerian-subjects';

type VerifiedRow={id:string;subject:string;topic:string;question_text:string;options:unknown};

export async function fetchVerifiedQuestionBank(exam:string,subject:string):Promise<PracticeQuestion[]>{
  try{
    const params=new URLSearchParams({exam,subject});
    const response=await fetch(`/api/cbt/verified-questions?${params.toString()}`,{cache:'no-store'});
    if(!response.ok)return [];
    const payload=await response.json();
    if(!Array.isArray(payload?.questions))return [];
    return payload.questions.flatMap((row:VerifiedRow)=>{
      const options=Array.isArray(row.options)?row.options.map(String):[];
      // The delivery API intentionally withholds answers. These rows become usable
      // for live scoring only after session creation supplies a server-side answer map.
      if(!row.id||!row.subject||!row.topic||!row.question_text||options.length!==4)return [];
      return [{id:`db:${row.id}`,subject:row.subject,topic:row.topic,q:row.question_text,o:options,a:-1} as PracticeQuestion];
    });
  }catch{return []}
}
