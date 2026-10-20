import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';

export async function GET(req:NextRequest){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return NextResponse.json({authenticated:false,count:0},{status:401});
  const exam=(req.nextUrl.searchParams.get('exam')||'').trim();
  const subject=(req.nextUrl.searchParams.get('subject')||'').trim();
  if(!exam||!subject)return NextResponse.json({error:'exam and subject are required'},{status:400});
  const {count,error}=await supabase.from('cbt_verified_questions').select('id',{count:'exact',head:true}).eq('exam',exam).eq('subject',subject).eq('active',true);
  if(error)return NextResponse.json({authenticated:true,count:0,available:false});
  return NextResponse.json({authenticated:true,count:count??0,available:(count??0)>0});
}
