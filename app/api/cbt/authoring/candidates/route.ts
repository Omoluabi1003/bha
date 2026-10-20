import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {reviewAuthoredCandidate,type AuthoredCandidate,type Difficulty} from '@/lib/cbt/question-authoring';
import type {PracticeQuestion} from '@/lib/cbt/nigerian-subjects';

async function authorizer(){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return {error:NextResponse.json({error:'Authentication required'},{status:401})};const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();if(!profile||!['proprietor','staff'].includes(profile.role))return {error:NextResponse.json({error:'Not authorized'},{status:403})};return {supabase,user};}
export async function GET(req:NextRequest){const auth=await authorizer();if('error'in auth)return auth.error;const status=req.nextUrl.searchParams.get('status')||'review';if(!['draft','rejected','review','approved'].includes(status))return NextResponse.json({error:'Invalid status'},{status:400});const {data,error}=await auth.supabase.from('cbt_question_candidates').select('*').eq('status',status).order('created_at',{ascending:false}).limit(100);if(error)return NextResponse.json({error:'Unable to load candidate queue'},{status:500});return NextResponse.json({candidates:data??[]});}
export async function POST(req:NextRequest){
 const auth=await authorizer();if('error'in auth)return auth.error;
 const body=await req.json().catch(()=>null);if(!body||typeof body!=='object')return NextResponse.json({error:'Invalid JSON'},{status:400});
 const exam=String(body.exam||'').trim(),subject=String(body.subject||'').trim(),topic=String(body.topic||'').trim(),questionText=String(body.question||'').trim(),syllabusRef=String(body.syllabusRef||'').trim(),rationale=String(body.rationale||'').trim();
 const options=Array.isArray(body.options)?body.options.map((x:unknown)=>String(x).trim()):[];const correctOption=Number(body.correctOption);const difficulty=body.difficulty as Difficulty;
 if(!exam||!subject||!topic||!questionText||!syllabusRef||!rationale||options.length!==4||options.some((x:string)=>!x)||!Number.isInteger(correctOption)||correctOption<0||correctOption>3||!['easy','medium','hard'].includes(difficulty))return NextResponse.json({error:'Candidate payload is incomplete or malformed'},{status:422});
 const question:PracticeQuestion={id:crypto.randomUUID(),subject,topic,q:questionText,o:options,a:correctOption};
 const candidate:AuthoredCandidate={question,source:body.source==='ai'?'ai':'human',status:'draft',syllabusRef,difficulty,rationale,createdAt:Date.now()};
 const {data:existing}=await auth.supabase.from('cbt_verified_questions').select('id,subject,topic,question_text,options,correct_option').eq('subject',subject).eq('active',true).limit(1000);
 const verified:PracticeQuestion[]=(existing??[]).map((q:any)=>({id:String(q.id),subject:String(q.subject),topic:String(q.topic),q:String(q.question_text),o:Array.isArray(q.options)?q.options.map(String):[],a:Number(q.correct_option)}));
 const review=reviewAuthoredCandidate(candidate,verified),status=review.status==='review'?'review':'rejected';
 const {data,error}=await auth.supabase.from('cbt_question_candidates').insert({id:question.id,subject,exam,topic,syllabus_ref:syllabusRef,difficulty,question_text:questionText,options,correct_option:correctOption,rationale,source:candidate.source,status,rejection_reasons:review.reasons,created_by:auth.user.id}).select('id,status,rejection_reasons').single();
 if(error)return NextResponse.json({error:'Candidate could not be stored'},{status:500});return NextResponse.json({candidate:data,validation:review},{status:201});
}
