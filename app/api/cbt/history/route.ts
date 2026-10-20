import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

type QuestionResult={questionId:string;topic:string;correct:boolean};

export async function GET(req:NextRequest){
  try{
    const supabase=await createClient();
    const {data:{user}}=await supabase.auth.getUser();
    if(!user)return NextResponse.json({authenticated:false,seenQuestionIds:[],weakTopics:[]},{status:200,headers:{'Cache-Control':'no-store'}});
    const exam=req.nextUrl.searchParams.get('exam');
    const subject=req.nextUrl.searchParams.get('subject');
    if(!exam||!subject)return NextResponse.json({error:'Exam and subject are required'},{status:400});
    const {data,error}=await supabase.from('cbt_question_history').select('question_id,topic,times_seen,times_correct,last_seen_at').eq('user_id',user.id).eq('exam',exam).eq('subject',subject).order('last_seen_at',{ascending:false}).limit(2000);
    if(error)throw error;
    const rows=data||[];
    const topicMap=new Map<string,{seen:number;correct:number}>();
    for(const row of rows){const topic=row.topic||'General',v=topicMap.get(topic)||{seen:0,correct:0};v.seen+=row.times_seen||0;v.correct+=row.times_correct||0;topicMap.set(topic,v)}
    const weakTopics=[...topicMap.entries()].filter(([,v])=>v.seen>=2).sort((a,b)=>(a[1].correct/a[1].seen)-(b[1].correct/b[1].seen)).slice(0,3).map(([topic])=>topic);
    return NextResponse.json({authenticated:true,seenQuestionIds:rows.map(r=>r.question_id),weakTopics},{headers:{'Cache-Control':'no-store'}});
  }catch(e){console.error('CBT history read failed',e);return NextResponse.json({error:'Unable to read CBT history'},{status:500});}
}

export async function POST(req:NextRequest){
  try{
    const supabase=await createClient();
    const {data:{user}}=await supabase.auth.getUser();
    if(!user)return NextResponse.json({error:'Authentication required'},{status:401});
    const body=await req.json();
    const {exam,subject,mode,sessionId,score,total,unanswered=0,timedOut=false,attentionChanges=0,clipboardAttempts=0,questions=[]}=body as {exam:string;subject:string;mode:'practice'|'simulation';sessionId:string;score:number;total:number;unanswered?:number;timedOut?:boolean;attentionChanges?:number;clipboardAttempts?:number;questions?:QuestionResult[]};
    if(!exam||!subject||!sessionId||!['practice','simulation'].includes(mode)||!Number.isInteger(score)||!Number.isInteger(total)||total<=0||score<0||score>total)return NextResponse.json({error:'Invalid CBT history payload'},{status:400});
    const {error:attemptError}=await supabase.from('cbt_attempt_history').upsert({user_id:user.id,exam,subject,mode,session_id:sessionId,score,total,unanswered,timed_out:timedOut,attention_changes:attentionChanges,clipboard_attempts:clipboardAttempts},{onConflict:'user_id,session_id',ignoreDuplicates:true});
    if(attemptError)throw attemptError;
    for(const q of questions.slice(0,100)){if(!q?.questionId)continue;const {error}=await supabase.rpc('record_cbt_question_result',{p_exam:exam,p_subject:subject,p_question_id:q.questionId,p_topic:q.topic||'General',p_correct:Boolean(q.correct)});if(error)throw error;}
    return NextResponse.json({saved:true},{headers:{'Cache-Control':'no-store'}});
  }catch(e){console.error('CBT history write failed',e);return NextResponse.json({error:'Unable to save CBT history'},{status:500});}
}
