import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

export async function GET(req:NextRequest){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return NextResponse.json({error:'Authentication required'},{status:401});
  const exam=(req.nextUrl.searchParams.get('exam')||'').trim();
  const subject=(req.nextUrl.searchParams.get('subject')||'').trim();
  if(!exam||!subject)return NextResponse.json({error:'exam and subject are required'},{status:400});
  const {data,error}=await supabase.from('cbt_verified_questions').select('id,exam,subject,topic,difficulty,question_text,options').eq('exam',exam).eq('subject',subject).eq('active',true).limit(500);
  if(error)return NextResponse.json({error:'Verified questions unavailable'},{status:500});
  // Correct answers and rationales are deliberately withheld from the question-delivery response.
  return NextResponse.json({questions:data??[]});
}
