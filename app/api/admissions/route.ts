import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@/lib/supabase/server';
const categories=new Set(['Going to SS1','SS2 / SS3','WAEC / JAMB Retake','Secondary School Graduate']);
export async function POST(req:NextRequest){
 const body=await req.json().catch(()=>null);if(!body)return NextResponse.json({error:'Invalid application'},{status:400});
 const studentName=String(body.studentName||'').trim(),guardianName=String(body.guardianName||'').trim(),phone=String(body.phone||'').trim(),category=String(body.category||'').trim(),email=String(body.email||'').trim(),relationship=String(body.relationship||'').trim();
 if(studentName.length<2||guardianName.length<2||phone.replace(/\D/g,'').length<7||!categories.has(category))return NextResponse.json({error:'Please complete all required fields.'},{status:422});
 if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({error:'Please enter a valid email address.'},{status:422});
 const supabase=await createClient();const {data,error}=await supabase.rpc('submit_admission_application',{p_student_name:studentName,p_category:category,p_guardian_name:guardianName,p_phone:phone,p_email:email||null,p_relationship:relationship||null});
 if(error)return NextResponse.json({error:'Application could not be submitted. Please try again.'},{status:503});const result=data?.[0];if(!result)return NextResponse.json({error:'Application could not be created.'},{status:500});
 return NextResponse.json({reference:result.reference,status:result.status,submittedAt:result.submitted_at},{status:201});
}
