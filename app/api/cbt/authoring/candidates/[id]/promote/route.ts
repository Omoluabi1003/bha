import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

export async function POST(_req:NextRequest,{params}:{params:Promise<{id:string}>}){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return NextResponse.json({error:'Authentication required'},{status:401});
  const {data:profile}=await supabase.from('profiles').select('role').eq('id',user.id).maybeSingle();
  if(!profile||profile.role!=='proprietor')return NextResponse.json({error:'Verified-bank promotion requires proprietor authorization'},{status:403});
  const {id}=await params;
  const {data,error}=await supabase.rpc('promote_cbt_candidate',{p_candidate_id:id});
  if(error)return NextResponse.json({error:'Candidate could not be promoted to the verified bank'},{status:409});
  return NextResponse.json({verifiedQuestionId:data,promoted:true});
}
