import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';
import { initializePaystack } from '@/lib/paystack';

export async function POST(request:Request){
 try{
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user?.email)return NextResponse.json({error:'Authentication required'},{status:401});
  const {invoiceId}=await request.json();
  if(!invoiceId)return NextResponse.json({error:'Invoice is required'},{status:400});
  const {data:invoice,error}=await supabase.from('invoices').select('id,student_id,amount_due,amount_paid,status').eq('id',invoiceId).single();
  if(error||!invoice)return NextResponse.json({error:'Invoice not found or access denied'},{status:404});
  const balance=Number(invoice.amount_due)-Number(invoice.amount_paid);
  if(!Number.isFinite(balance)||balance<=0)return NextResponse.json({error:'Invoice has no outstanding balance'},{status:400});
  const amountKobo=Math.round(balance*100);
  const reference=`BHA-${Date.now()}-${crypto.randomBytes(5).toString('hex')}`;
  const origin=new URL(request.url).origin;
  const {data:payment,paymentError}=await (async()=>{const result=await supabase.from('payments').insert({invoice_id:invoice.id,payer_id:user.id,gateway:'paystack',gateway_reference:reference,amount:balance,currency:'NGN',status:'pending'}).select('id').single();return {data:result.data,paymentError:result.error};})();
  if(paymentError||!payment)return NextResponse.json({error:'Unable to create payment record'},{status:500});
  const initialized=await initializePaystack(user.email,amountKobo,reference,`${origin}/dashboard/parent`,{invoice_id:invoice.id,payment_id:payment.id,student_id:invoice.student_id});
  return NextResponse.json({authorizationUrl:initialized.authorization_url,reference});
 }catch{return NextResponse.json({error:'Unable to initialize payment'},{status:500});}
}
