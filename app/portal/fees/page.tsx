import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import './fees.css';

const money=(n:number)=>new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(n);
export default async function FeesPage(){
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user)redirect('/login?next=/portal/fees');
 const {data:profile}=await supabase.from('profiles').select('role,full_name').eq('id',user.id).single();
 const role=profile?.role||'student';
 let query=supabase.from('fee_invoices').select('id,title,term,academic_session,amount_due,amount_paid,due_date,status,student_id').order('created_at',{ascending:false});
 if(role==='student')query=query.eq('student_id',user.id);
 const {data:invoices,error}=await query;
 const rows=invoices||[];
 const total=rows.reduce((n:any,x:any)=>n+Number(x.amount_due),0);
 const paid=rows.reduce((n:any,x:any)=>n+Number(x.amount_paid),0);
 const due=Math.max(0,total-paid);
 return <main className="portal feesPortal">
  <header className="portalHeader"><div><span>BHA DIGITAL CAMPUS</span><h1>School Fees</h1><p>Clear balances. Verified payments. Permanent receipts.</p></div><Link href="/portal">Portal home</Link></header>
  <section className="feeSummary" aria-label="Fee summary"><div><small>OUTSTANDING</small><strong>{money(due)}</strong></div><div><small>TOTAL INVOICED</small><strong>{money(total)}</strong></div><div><small>PAID</small><strong>{money(paid)}</strong></div></section>
  <section className="feeNotice"><strong>Secure payment flow</strong><p>BHA only records a fee as paid after the payment provider confirms the transaction. A receipt is then attached to the verified payment record.</p></section>
  {error?<section className="feeEmpty"><h2>Fees connection pending</h2><p>The secure fee ledger is being connected. No payment is collected from this screen until the verified gateway is enabled.</p></section>:<section className="invoiceList"><div className="invoiceHeading"><div><span>INVOICES</span><h2>Your school fee statements</h2></div><p>{rows.length} {rows.length===1?'invoice':'invoices'}</p></div>{rows.length?rows.map((x:any)=>{const balance=Math.max(0,Number(x.amount_due)-Number(x.amount_paid));const settled=balance===0||x.status==='paid';return <article className="invoiceCard" key={x.id}><div className="invoiceMain"><span className={`status ${settled?'paid':'due'}`}>{settled?'PAID':x.status.replace('_',' ').toUpperCase()}</span><h3>{x.title}</h3><p>{x.term||'School fee'} {x.academic_session?`• ${x.academic_session}`:''}</p>{x.due_date&&!settled?<small>Due {new Date(`${x.due_date}T00:00:00`).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'})}</small>:null}</div><div className="invoiceMoney"><small>BALANCE</small><strong>{money(balance)}</strong><span>Paid {money(Number(x.amount_paid))} of {money(Number(x.amount_due))}</span>{settled?<button className="receiptButton" type="button" disabled>Receipt available after verified ledger entry</button>:<button className="payButton" type="button" disabled>PAY SECURELY</button>}</div></article>}):<div className="feeEmpty"><h2>No invoices yet</h2><p>There are currently no school-fee invoices assigned to this account.</p></div>}</section>}
  <section className="paymentSteps"><h2>How BHA online payment works</h2><div><span><b>1</b><strong>Choose invoice</strong><small>Select the outstanding school fee.</small></span><span><b>2</b><strong>Pay securely</strong><small>Complete payment on the verified provider checkout.</small></span><span><b>3</b><strong>Automatic verification</strong><small>BHA confirms the provider reference server-side.</small></span><span><b>4</b><strong>Get receipt</strong><small>Your balance and receipt update automatically.</small></span></div></section>
 </main>
}
