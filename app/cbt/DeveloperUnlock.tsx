"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const exams = ["JAMB", "WAEC", "NECO", "BHA INTERNAL"];

export default function DeveloperUnlock(){
 const [unlocked,setUnlocked]=useState(false);
 const [message,setMessage]=useState("");
 const taps=useRef(0);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{setUnlocked(localStorage.getItem("bha-developer-cbt")==="enabled")},[]);
 const tap=()=>{
  if(unlocked)return;
  taps.current+=1;
  if(timer.current)clearTimeout(timer.current);
  timer.current=setTimeout(()=>{taps.current=0;setMessage("")},2500);
  const remaining=7-taps.current;
  if(remaining<=0){localStorage.setItem("bha-developer-cbt","enabled");setUnlocked(true);setMessage("Developer Mode enabled");taps.current=0;return;}
  if(remaining<=4)setMessage(`${remaining} tap${remaining===1?"":"s"} away from Developer Mode`);
 };
 const disable=()=>{localStorage.removeItem("bha-developer-cbt");setUnlocked(false);setMessage("")};
 return <>
  <button type="button" className="cbtSecretTrigger" onClick={tap} aria-label="BHA Digital Campus">BHA DIGITAL CAMPUS</button>
  {message&&<div className="developerToast" role="status">{message}</div>}
  {unlocked&&<section className="developerConsole">
   <div className="developerConsoleHead"><div><span>DEVELOPER MODE</span><h2>CBT Exam Preview</h2><p>Direct product-review access. Preview sessions do not create student scores or attempt history.</p></div><button type="button" onClick={disable}>Disable Developer Mode</button></div>
   <div className="developerExamGrid">{exams.map(exam=><Link key={exam} href={`/cbt/preview?exam=${encodeURIComponent(exam)}`}><strong>{exam}</strong><small>OPEN EXAM PREVIEW →</small></Link>)}</div>
  </section>}
 </>;
}