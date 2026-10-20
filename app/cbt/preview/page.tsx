"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../cbt.css";
const questions=[
 {q:"The students ___ preparing for the examination.",o:["is","are","was","be"]},
 {q:"If 3x + 6 = 21, what is x?",o:["3","5","7","9"]},
 {q:"Which process allows green plants to manufacture food using light energy?",o:["Respiration","Photosynthesis","Transpiration","Germination"]}
];
export default function Preview(){
 const [exam,setExam]=useState("JAMB");const [allowed,setAllowed]=useState<boolean|null>(null);const [current,setCurrent]=useState(0);const [answers,setAnswers]=useState<Record<number,number>>({});
 useEffect(()=>{setAllowed(localStorage.getItem("bha-developer-cbt")==="enabled");const value=new URLSearchParams(window.location.search).get("exam");if(value)setExam(value)},[]);
 if(allowed===null)return <main className="previewGate">Checking Developer Mode...</main>;
 if(!allowed)return <main className="previewGate"><h1>Developer Mode is locked</h1><p>Return to the CBT Practice Centre and use the hidden developer unlock.</p><Link href="/cbt">Return to CBT</Link></main>;
 const item=questions[current];
 return <main className="examPreview"><header><div><span>BEST HOME ACADEMY | DEVELOPER PREVIEW</span><h1>{exam} CBT Simulation</h1></div><div><small>PREVIEW TIMER</small><strong>30:00</strong></div></header><div className="previewBody"><section className="previewQuestion"><p>Question {current+1} of {questions.length}</p><h2>{item.q}</h2><div className="previewOptions">{item.o.map((option,i)=><button key={option} className={answers[current]===i?"selected":""} onClick={()=>setAnswers(a=>({...a,[current]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div><div className="previewControls"><button disabled={current===0} onClick={()=>setCurrent(c=>c-1)}>Previous</button><button disabled={current===questions.length-1} onClick={()=>setCurrent(c=>c+1)}>Next</button></div></section><aside><span>QUESTION NAVIGATOR</span><div className="previewNav">{questions.map((_,i)=><button key={i} onClick={()=>setCurrent(i)} className={i===current?"current":""}>{i+1}</button>)}</div><p>{Object.keys(answers).length} answered</p><button className="previewSubmit" onClick={()=>alert("Developer Preview only. No student score was recorded.")}>SUBMIT PREVIEW</button><Link href="/cbt">Exit preview</Link></aside></div></main>;
}