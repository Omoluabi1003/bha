import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { verifyPaystack } from '@/lib/paystack';

export async function POST(request:Request){
 try{
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)return NextResponse.json({error:'Authentication required'},{status:401});
  const {reference}=await request.json();
  const {data:payment}=await supabase.from('payments').select('id,invoice_id,amount,currency,status,payer_id').eq('gateway_reference',reference).eq('payer_id',user.id).single();
  if(!payment)return NextResponse.json({error:'Payment not found'},{status:404});
  const gateway=await verifyPaystack(reference);
  const expectedKobo=Math.round(Number(payment.amount)*100);
  const valid=gateway.status==='success'&&gateway.reference===reference&&gateway.currency===payment.currency&&Number(gateway.amount)===expectedKobo;
  if(!valid)return NextResponse.json({verified:false},{status:409});
  // Settlement is finalized by the signed webhook/database reconciliation path.
  return NextResponse.json({verified:true,reference,invoiceId:payment.invoice_id});
 }catch{return NextResponse.json({error:'Unable to verify payment'},{status:500});}
}
