"use client";
import Link from "next/link";
import { useEffect,useMemo,useState } from "react";
import "../cbt.css";
import "./subject-picker.css";
import {ExamName,questionsFor,subjectCatalog,PracticeQuestion} from "../../../lib/cbt/nigerian-subjects";
import {getSessionConfig} from "../../../lib/cbt/session-config";

function buildSession(pool:PracticeQuestion[],count:number):PracticeQuestion[]{
 if(!pool.length)return [];
 const result:PracticeQuestion[]=[];
 for(let i=0;i<count;i++)result.push(pool[i%pool.length]);
 return result;
}

export default function Preview(){
 const [exam,setExam]=useState<ExamName>("JAMB");
 const [subject,setSubject]=useState("");
 const [allowed,setAllowed]=useState<boolean|null>(null);
 const [current,setCurrent]=useState(0);
 const [answers,setAnswers]=useState<Record<number,number>>({});
 useEffect(()=>{setAllowed(localStorage.getItem("bha-developer-cbt")==="enabled");const value=new URLSearchParams(window.location.search).get("exam") as ExamName|null;if(value&&value in subjectCatalog)setExam(value)},[]);
 useEffect(()=>{setSubject("");setCurrent(0);setAnswers({})},[exam]);
 const config=subject?getSessionConfig(exam,subject):null;
 const sourceQuestions=subject?questionsFor(subject):[];
 const questions=useMemo(()=>config?buildSession(sourceQuestions,config.questionCount):[],[subject,exam]);
 if(allowed===null)return <main className="previewGate">Checking Developer Mode...</main>;
 if(!allowed)return <main className="previewGate"><h1>Developer Mode is locked</h1><p>Return to the CBT Practice Centre and use the hidden developer unlock.</p><Link href="/cbt">Return to CBT</Link></main>;
 if(!subject)return <main className="subjectPicker"><header><span>BEST HOME ACADEMY | NIGERIAN CBT</span><h1>{exam} Subject Selection</h1><p>Choose a subject, then take a full objective practice session configured to the Nigerian examination context.</p></header><div className="examSwitch">{(Object.keys(subjectCatalog) as ExamName[]).map(name=><button key={name} className={name===exam?"active":""} onClick={()=>setExam(name)}>{name}</button>)}</div>{exam==="JAMB"&&<div className="subjectNotice"><strong>JAMB:</strong> Use of English is compulsory and carries 60 questions. Each of the other three UTME subjects carries 40 questions in the official 180-question examination.</div>}<div className="subjectGrid">{subjectCatalog[exam].map(name=>{const cfg=getSessionConfig(exam,name);return <button key={name} onClick={()=>setSubject(name)}><strong>{name}</strong><span>{cfg.questionCount} QUESTIONS · START TEST →</span></button>})}</div><Link className="pickerExit" href="/cbt">← Back to CBT Practice Centre</Link></main>;
 const item=questions[current];
 const submit=()=>{const score=questions.reduce((total,q,i)=>total+(answers[i]===q.a?1:0),0);alert(`Developer Preview: ${score}/${questions.length} correct in ${subject}. No student score was recorded.`)};
 return <main className="examPreview"><header><div><span>BEST HOME ACADEMY | {exam}</span><h1>{subject}</h1><small>{item.topic}</small></div><div><small>PRACTICE TIME</small><strong>{config?.durationMinutes}:00</strong></div></header><div className="previewBody"><section className="previewQuestion"><p>{subject} · Question {current+1} of {questions.length}</p><h2>{item.q}</h2><div className="previewOptions">{item.o.map((option,i)=><button key={`${current}-${i}`} className={answers[current]===i?"selected":""} onClick={()=>setAnswers(a=>({...a,[current]:i}))}><b>{String.fromCharCode(65+i)}</b><span>{option}</span></button>)}</div><div className="previewControls"><button disabled={current===0} onClick={()=>setCurrent(c=>c-1)}>Previous</button><button disabled={current===questions.length-1} onClick={()=>setCurrent(c=>c+1)}>Next</button></div></section><aside><button className="changeSubject" onClick={()=>setSubject("")}>CHANGE SUBJECT</button><span>QUESTION NAVIGATOR</span><div className="previewNav">{questions.map((_,i)=><button key={i} onClick={()=>setCurrent(i)} className={`${i===current?"current ":""}${answers[i]!==undefined?"answered":""}`.trim()}>{i+1}</button>)}</div><p>{Object.keys(answers).length} of {questions.length} answered</p>{config&&<p>{config.note}</p>}<button className="previewSubmit" onClick={submit}>SUBMIT TEST</button><Link href="/cbt">Exit preview</Link></aside></div></main>;
}