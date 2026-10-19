import Link from "next/link";
import { ArrowRight, Banknote, Bell, BookOpenCheck, CalendarDays, Check, ChevronRight, CircleAlert, Clock3, FileCheck2, GraduationCap, Megaphone, Plus, ReceiptText, Search, ShieldCheck, UserPlus, Users } from "lucide-react";

const actions=[
 {title:'Review admissions',detail:'New applications will appear here for decision.',icon:FileCheck2,tone:'gold'},
 {title:'Follow up unpaid fees',detail:'Outstanding family balances will be prioritized here.',icon:Banknote,tone:'rose'},
 {title:'Attendance exceptions',detail:'Absences and incomplete registers will surface here.',icon:BookOpenCheck,tone:'blue'}
] as const;
const shortcuts=[['Admit a student',UserPlus],['Create invoice',ReceiptText],['Post announcement',Megaphone],['Manage session',CalendarDays]] as const;

export default function Proprietor(){return <main className="bhOS">
 <header className="bhTop"><Link href="/" className="bhIdentity"><span className="bhMark">BH</span><span><b>Best Home Academy</b><small>Excellence, made visible.</small></span></Link><nav><a className="selected">Home</a><a>Students</a><a>Academics</a><a>Fees</a><a>Admissions</a></nav><div className="bhTopTools"><button><Search/></button><button><Bell/></button><span className="bhUser">PI</span></div></header>
 <div className="bhMobileNav"><b>BHA</b><span>Proprietor workspace</span><button><Bell/></button></div>
 <section className="bhCanvas">
  <div className="bhGreeting"><div><p>PROPRIETOR WORKSPACE · 2026/2027</p><h1>Good afternoon.</h1><span>Here is what deserves your attention at Best Home Academy.</span></div><button className="bhCreate"><Plus/> New</button></div>
  <section className="bhHeroGrid"><article className="bhAttention"><div className="bhSectionHead"><div><span className="bhPulse"></span><b>Needs your attention</b></div><small>Decision queue</small></div>{actions.map(({title,detail,icon:I,tone},i)=><button className="bhTask" key={title}><span className={`bhTaskIcon ${tone}`}><I/></span><span><b>{title}</b><small>{detail}</small></span><span className="bhTaskRight"><em>{i===0?'Admissions':i===1?'Finance':'Academics'}</em><ChevronRight/></span></button>)}<button className="bhViewAll">View all school activity <ArrowRight/></button></article>
   <aside className="bhSnapshot"><p>SCHOOL SNAPSHOT</p><h2>Today at BHA</h2><div className="bhSnapshotRows"><span><Users/><small>Students</small><b>—</b></span><span><BookOpenCheck/><small>Attendance</small><b>—</b></span><span><Banknote/><small>Fees received</small><b>₦0</b></span></div><div className="bhSnapshotNote"><Clock3/><span><b>Live school data is next</b><small>These figures populate automatically once the production database is connected.</small></span></div></aside>
  </section>
  <section className="bhShortcuts"><div className="bhSectionTitle"><span><small>WORKSPACE</small><h2>Start something</h2></span><p>Common school operations, one click away.</p></div><div className="bhShortcutGrid">{shortcuts.map(([label,I])=><button key={label}><I/><span>{label}</span><ArrowRight/></button>)}</div></section>
  <section className="bhFlowGrid"><article className="bhFlow"><div className="bhSectionTitle"><span><small>ADMISSIONS</small><h2>From application to enrollment</h2></span><Link href="/admissions">Open admissions <ArrowRight/></Link></div><div className="bhPipeline"><span className="done"><i><Check/></i><b>Application</b><small>Submitted online</small></span><hr/><span><i>2</i><b>Review</b><small>School decision</small></span><hr/><span><i>3</i><b>Accept</b><small>Create student</small></span><hr/><span><i>4</i><b>Enroll</b><small>Invoice & activate</small></span></div></article>
   <article className="bhMoney"><div><span className="bhMoneyIcon"><ShieldCheck/></span><p>FEE COLLECTION</p><h2>Money should never become a mystery.</h2><span>Every successful online payment is designed to connect the student, invoice, gateway reference and receipt.</span></div><button>Open finance <ArrowRight/></button></article>
  </section>
  <section className="bhActivity"><div className="bhSectionTitle"><span><small>RECENT ACTIVITY</small><h2>School timeline</h2></span><button>See everything</button></div><div className="bhEmpty"><CircleAlert/><div><b>No live activity yet</b><p>Admissions, payments, attendance, results and administrative actions will form one chronological school record here.</p></div></div></section>
 </section>
 <footer className="bhFooter"><span>Best Home Academy · 16 Umana Ndon, Eket, Akwa Ibom State</span><span>Designed &amp; developed by <b>ETL GIS Consulting LLC</b></span></footer>
 </main>}
