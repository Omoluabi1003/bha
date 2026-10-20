import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();
 if(!user)return NextResponse.json({error:'Authentication required'},{status:401});
 const body=await req.json().catch(()=>null);if(!body||typeof body.answers!=='object'||Array.isArray(body.answers))return NextResponse.json({error:'Invalid answers'},{status:400});
 const {id}=await params;const answers:Record<string,number>={};
 for(const [key,value] of Object.entries(body.answers)){const n=Number(value);if(Number.isInteger(n)&&n>=0&&n<=3)answers[key]=n}
 const {data,error}=await supabase.rpc('submit_verified_cbt_session',{p_session_id:id,p_answers:answers});
 if(error)return NextResponse.json({error:'Session could not be submitted'},{status:409});
 const result=data?.[0];if(!result)return NextResponse.json({error:'No result returned'},{status:500});
 return NextResponse.json({score:result.score,total:result.total,unanswered:result.unanswered});
}
