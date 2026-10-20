import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {reviewAuthoredCandidate,type AuthoredCandidate} from '@/lib/cbt/question-authoring';
import type {PracticeQuestion} from '@/lib/cbt/nigerian-subjects';

async function authorizer(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return {error:NextResponse.json({error:'Authentication required'},{status:401})};
  const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();
  if(!profile||!['proprietor','staff'].includes(profile.role))return {error:NextResponse.json({error:'Not authorized'},{status:403})};
  return {supabase,user};
}

export async function GET(req:NextRequest){
  const auth=await authorizer();if('error' in auth)return auth.error;
  const status=req.nextUrl.searchParams.get('status')||'review';
  if(!['draft','rejected','review','approved'].includes(status))return NextResponse.json({error:'Invalid status'},{status:400});
  const {data,error}=await auth.supabase.from('cbt_question_candidates').select('*').eq('status',status).order('created_at',{ascending:false}).limit(100);
  if(error)return NextResponse.json({error:'Unable to load candidate queue'},{status:500});
  return NextResponse.json({candidates:data??[]});
}

export async function POST(req:NextRequest){
  const auth=await authorizer();if('error' in auth)return auth.error;
  let body:any;try{body=await req.json()}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
  const options=Array.isArray(body?.options)?body.options.map((x:unknown)=>String(x).trim()):[];
  const question:PracticeQuestion={id:crypto.randomUUID(),subject:String(body?.subject||'').trim(),topic:String(body?.topic||'').trim(),q:String(body?.question||'').trim(),o:options,a:Number(body?.correctOption)};
  const candidate:AuthoredCandidate={question,source:body?.source==='ai'?'ai':'human',status:'draft',syllabusRef:String(body?.syllabusRef||'').trim(),difficulty:body?.difficulty,rationale:String(body?.rationale||'').trim(),createdAt:Date.now()};
  const review=reviewAuthoredCandidate(candidate,[]);
  const status=review.status==='review'?'review':'rejected';
  const {data,error}=await auth.supabase.from('cbt_question_candidates').insert({id:question.id,subject:question.subject,exam:String(body?.exam||'').trim(),topic:question.topic,syllabus_ref:candidate.syllabusRef,difficulty:candidate.difficulty,question_text:question.q,options:question.o,correct_option:question.a,rationale:candidate.rationale,source:candidate.source,status,rejection_reasons:review.reasons,created_by:auth.user.id}).select('id,status,rejection_reasons').single();
  if(error)return NextResponse.json({error:'Candidate could not be stored'},{status:500});
  return NextResponse.json({candidate:data,validation:review},{status:201});
}
