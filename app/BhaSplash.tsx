"use client";
import {useEffect,useState} from "react";
import "./bha-splash.css";

export default function BhaSplash(){
 const [visible,setVisible]=useState(false);const [leaving,setLeaving]=useState(false);
 useEffect(()=>{if(sessionStorage.getItem("bha-splash-seen"))return;setVisible(true);const exit=setTimeout(()=>setLeaving(true),2700);const done=setTimeout(()=>{setVisible(false);sessionStorage.setItem("bha-splash-seen","1")},3400);return()=>{clearTimeout(exit);clearTimeout(done)}},[]);
 if(!visible)return null;
 const enter=()=>{setLeaving(true);setTimeout(()=>{setVisible(false);sessionStorage.setItem("bha-splash-seen","1")},500)};
 return <div className={`bhaSplash ${leaving?"bhaSplashExit":""}`} role="dialog" aria-label="Welcome to Best Home Academy">
   <div className="bhaSplashGlow"/><div className="bhaSplashPattern"/>
   <main className="bhaSplashInner">
    <div className="bhaSplashCrest" aria-label="Best Home Academy crest">
      <svg viewBox="0 0 512 512" role="img" aria-hidden="true"><rect width="512" height="512" rx="104" fill="#14213A"/><path d="M128 92h256v218c0 74-55 110-128 134-73-24-128-60-128-134V92Z" fill="#FFFDF9" stroke="#C89B42" strokeWidth="18"/><path d="M170 170h172v28H170zm0 60h172v28H170zm0 60h110v28H170z" fill="#14213A"/><circle cx="329" cy="304" r="54" fill="#C89B42"/><path d="m302 305 18 18 38-46" fill="none" stroke="#FFFDF9" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/><text x="256" y="151" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="48" fontWeight="900" fill="#14213A">BHA</text></svg>
    </div>
    <p className="bhaSplashKicker">EKET · AKWA IBOM STATE</p>
    <h1>BEST HOME<br/><span>ACADEMY</span></h1>
    <div className="bhaSplashRule"/>
    <p className="bhaSplashMotto">Excellence Is Doing Ordinary Things<br/>Extraordinarily Well.</p>
    <button onClick={enter}>ENTER BHA <span>→</span></button>
   </main>
   <footer className="bhaSplashCredit"><span>DESIGNED &amp; DEVELOPED BY</span><strong>ETL GIS CONSULTING LLC</strong></footer>
 </div>
}
