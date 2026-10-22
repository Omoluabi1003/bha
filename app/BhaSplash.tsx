"use client";
import {useEffect,useState} from "react";
import "./bha-splash.css";

const officialBhaCrest="https://raw.githubusercontent.com/Omoluabi1003/bha/main/9DF002EA-EE3F-4507-924B-82B021A3F925.png";
export default function BhaSplash(){
 const [visible,setVisible]=useState(false);const [leaving,setLeaving]=useState(false);
 useEffect(()=>{if(sessionStorage.getItem("bha-splash-seen"))return;setVisible(true);const exit=setTimeout(()=>setLeaving(true),7200);const done=setTimeout(()=>{setVisible(false);sessionStorage.setItem("bha-splash-seen","1")},8000);return()=>{clearTimeout(exit);clearTimeout(done)}},[]);
 if(!visible)return null;
 const enter=()=>{setLeaving(true);setTimeout(()=>{setVisible(false);sessionStorage.setItem("bha-splash-seen","1")},500)};
 return <div className={`bhaSplash ${leaving?"bhaSplashExit":""}`} role="dialog" aria-label="Welcome to Best Home Academy">
   <div className="bhaSplashGhostCrest" aria-hidden="true"><img src={officialBhaCrest} alt=""/></div>
   <div className="bhaSplashGlow"/><div className="bhaSplashPattern"/>
   <main className="bhaSplashInner">
    <div className="bhaSplashCrest"><span className="bhaSplashSweep"/><img src={officialBhaCrest} alt="Best Home Academy official crest" fetchPriority="high" decoding="sync"/></div>
    <p className="bhaSplashKicker">EKET · AKWA IBOM STATE</p>
    <h1>BEST HOME<br/><span>ACADEMY</span></h1>
    <div className="bhaSplashRule"/>
    <p className="bhaSplashMotto">Excellence Is Doing Ordinary Things<br/>Extraordinarily Well.</p>
    <button onClick={enter}>ENTER BHA <span>→</span></button>
   </main>
   <footer className="bhaSplashCredit"><span>DESIGNED &amp; DEVELOPED BY</span><strong>ETL GIS CONSULTING LLC</strong></footer>
 </div>
}
