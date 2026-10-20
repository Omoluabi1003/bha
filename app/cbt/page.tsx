import Link from "next/link";
import { ArrowLeft, BarChart3, BookOpenCheck, Clock3, MonitorCheck, Target } from "lucide-react";
import "../bha-home.css";

const exams=[
 {name:"JAMB",detail:"Computer-based preparation and timed practice"},
 {name:"WAEC",detail:"Subject practice and revision sessions"},
 {name:"NECO",detail:"Focused preparation and performance review"},
];

export default function CBTPractice(){return <main className="bhaHome cbtPage">
 <section className="cbtPageHero"><div className="wrap"><Link href="/" className="cbtBack"><ArrowLeft size={16}/>Best Home Academy</Link><p className="eyebrow">BHA DIGITAL CAMPUS</p><h1>CBT Practice Centre</h1><p>Build examination confidence through focused practice, timed simulations and performance feedback.</p></div></section>
 <section className="section"><div className="wrap"><div className="cbtExamGrid">{exams.map(x=><div className="cbtExamCard" key={x.name}><MonitorCheck/><span className="cardKicker">EXAM PATHWAY</span><h2>{x.name}</h2><p>{x.detail}</p><span className="cbtStatus">Practice engine in development</span></div>)}</div><div className="cbtHow"><div><BookOpenCheck/><strong>Practice Mode</strong><p>Work through focused questions with review and explanations where available.</p></div><div><Clock3/><strong>Exam Simulation</strong><p>Use timed sessions, question navigation and automatic submission to practise examination discipline.</p></div><div><Target/><strong>Topic Focus</strong><p>Concentrate practice on subjects and topics that need the most attention.</p></div><div><BarChart3/><strong>Progress</strong><p>Track scores, accuracy and attempt history as the performance engine comes online.</p></div></div><div className="cbtNotice"><div><span className="cardKicker">SAFE FOUNDATION</span><h2>Built around BHA learning.</h2><p>The question bank will prioritize BHA-authored questions and appropriately licensed educational material. Student authentication, autosave, scoring and analytics will be connected as the Digital Campus backend is implemented.</p></div><Link className="primary" href="/login">Student login</Link></div></div></section>
 </main>}