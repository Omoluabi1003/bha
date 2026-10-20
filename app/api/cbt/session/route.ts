import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

export async function POST(req:NextRequest){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();
 if(!user)return NextResponse.json({error:'Authentication required'},{status:401});
 const body=await req.json().catch(()=>null);if(!body)return NextResponse.json({error:'Invalid request'},{status:400});
 const exam=String(body.exam||'').trim(),subject=String(body.subject||'').trim(),mode=body.mode==='practice'?'practice':'simulation',count=Number(body.count);
 if(!exam||!subject||!Number.isInteger(count)||count<1||count>60)return NextResponse.json({error:'Invalid session request'},{status:400});
 const {data,error}=await supabase.rpc('start_verified_cbt_session',{p_exam:exam,p_subject:subject,p_mode:mode,p_count:count});
 if(error)return NextResponse.json({error:'Verified question bank is not ready for this session'},{status:409});
 if(!data?.length)return NextResponse.json({error:'No session created'},{status:409});
 return NextResponse.json({sessionId:data[0].session_id,questions:data.map((q:any)=>({id:q.question_id,topic:q.topic,q:q.question_text,o:q.options,position:q.position}))});
}
