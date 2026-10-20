import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
import {reviewAuthoredCandidate,type AuthoredCandidate} from '@/lib/cbt/question-authoring';
import type {PracticeQuestion} from '@/lib/cbt/nigerian-subjects';
export async function POST(_req:NextRequest,{params}:{params:Promise<{id:string}>}){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.json({error:'Authentication required'},{status:401});
 const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();if(!profile||profile.role!=='proprietor')return NextResponse.json({error:'Academic approval requires proprietor authorization'},{status:403});
 const {id}=await params;const {data:candidate,error:loadError}=await supabase.from('cbt_question_candidates').select('*').eq('id',id).maybeSingle();if(loadError||!candidate)return NextResponse.json({error:'Candidate not found'},{status:404});if(candidate.status!=='review')return NextResponse.json({error:'Only candidates that passed validation can be approved'},{status:409});
 const {data:existing}=await supabase.from('cbt_verified_questions').select('id,subject,topic,question_text,options,correct_option').eq('subject',candidate.subject).eq('active',true).limit(1000);
 const verified:PracticeQuestion[]=(existing??[]).map((q:any)=>({id:String(q.id),subject:String(q.subject),topic:String(q.topic),q:String(q.question_text),o:Array.isArray(q.options)?q.options.map(String):[],a:Number(q.correct_option)}));
 const authored:AuthoredCandidate={question:{id:String(candidate.id),subject:String(candidate.subject),topic:String(candidate.topic),q:String(candidate.question_text),o:Array.isArray(candidate.options)?candidate.options.map(String):[],a:Number(candidate.correct_option)},source:candidate.source,status:'review',syllabusRef:String(candidate.syllabus_ref),difficulty:candidate.difficulty,rationale:String(candidate.rationale),createdAt:new Date(candidate.created_at).getTime()};
 const review=reviewAuthoredCandidate(authored,verified);if(review.status!=='review')return NextResponse.json({error:'Candidate no longer passes current validation',validation:review},{status:409});
 const {data,error}=await supabase.from('cbt_question_candidates').update({status:'approved',reviewed_by:user.id,reviewed_at:new Date().toISOString(),rejection_reasons:[]}).eq('id',id).eq('status','review').select('id,status,reviewed_by,reviewed_at').single();if(error)return NextResponse.json({error:'Candidate approval failed'},{status:500});return NextResponse.json({candidate:data,validation:review});
}
