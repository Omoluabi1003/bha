import { NextResponse } from 'next/server';
import { validPaystackSignature } from '@/lib/paystack';

export async function POST(request:Request){
 const raw=await request.text();
 if(!validPaystackSignature(raw,request.headers.get('x-paystack-signature'))) return NextResponse.json({error:'Invalid signature'},{status:401});
 const event=JSON.parse(raw);
 // Never trust a browser redirect for settlement. A production DB transaction will
 // reconcile charge.success against the stored reference, expected NGN amount,
 // invoice and payer before crediting the invoice and issuing a receipt.
 if(event?.event==='charge.success') console.info('Verified Paystack webhook received',event.data?.reference);
 return NextResponse.json({received:true});
}
