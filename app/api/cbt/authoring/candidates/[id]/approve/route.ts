import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

export async function POST(_req:NextRequest,{params}:{params:Promise<{id:string}>}){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return NextResponse.json({error:'Authentication required'},{status:401});
  const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();
  if(!profile||profile.role!=='proprietor')return NextResponse.json({error:'Academic approval requires proprietor authorization'},{status:403});
  const {id}=await params;
  const {data:candidate,error:loadError}=await supabase.from('cbt_question_candidates').select('*').eq('id',id).maybeSingle();
  if(loadError||!candidate)return NextResponse.json({error:'Candidate not found'},{status:404});
  if(candidate.status!=='review')return NextResponse.json({error:'Only candidates that passed validation can be approved'},{status:409});
  const {data,error}=await supabase.from('cbt_question_candidates').update({status:'approved',reviewed_by:user.id,reviewed_at:new Date().toISOString()}).eq('id',id).eq('status','review').select('id,status,reviewed_by,reviewed_at').single();
  if(error)return NextResponse.json({error:'Candidate approval failed'},{status:500});
  return NextResponse.json({candidate:data});
}
