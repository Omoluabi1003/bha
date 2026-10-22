"use client";
import {useEffect,useRef,useState} from "react";
import "./bha-splash.css";

const officialBhaCrest="https://raw.githubusercontent.com/Omoluabi1003/bha/main/9DF002EA-EE3F-4507-924B-82B021A3F925.png";
export default function BhaSplash(){
 const [visible,setVisible]=useState(false);const [leaving,setLeaving]=useState(false);const rootRef=useRef<HTMLDivElement|null>(null);const beamRef=useRef<HTMLDivElement|null>(null);
 useEffect(()=>{if(sessionStorage.getItem("bha-splash-seen"))return;setVisible(true);const exit=setTimeout(()=>setLeaving(true),7200);const done=setTimeout(()=>{setVisible(false);sessionStorage.setItem("bha-splash-seen","1")},8000);return()=>{clearTimeout(exit);clearTimeout(done)}},[]);
 useEffect(()=>{if(!visible||!rootRef.current)return;let raf=0;let started=performance.now();const tick=(now:number)=>{const root=rootRef.current;if(!root)return;const t=(now-started)/1000;root.style.setProperty('--splash-orbit-one',`${t*48}deg`);root.style.setProperty('--splash-orbit-two',`${-t*62}deg`);root.style.setProperty('--splash-float',`${Math.sin(t*2.15)*7}px`);root.style.setProperty('--splash-pulse',String(.92+((Math.sin(t*2.4)+1)/2)*.16));root.style.setProperty('--splash-drift-x',`${(t*18)%82}px`);root.style.setProperty('--splash-drift-y',`${(t*12)%82}px`);root.style.setProperty('--splash-ghost-rotate',`${-3+Math.min(t/8,1)*6}deg`);root.style.setProperty('--splash-ghost-scale',String(.9+Math.min(t/8,1)*.2));raf=requestAnimationFrame(tick)};const resume=()=>{started=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(tick)};document.addEventListener('visibilitychange',resume);window.addEventListener('pageshow',resume);raf=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(raf);document.removeEventListener('visibilitychange',resume);window.removeEventListener('pageshow',resume)}},[visible]);
 useEffect(()=>{if(!visible||!beamRef.current)return;const beam=beamRef.current;let animation:Animation|null=null;const play=()=>{animation?.cancel();animation=beam.animate([{transform:'translate3d(-52vw,0,0) rotate(14deg)',opacity:0},{transform:'translate3d(-30vw,0,0) rotate(14deg)',opacity:.78,offset:.12},{transform:'translate3d(42vw,0,0) rotate(14deg)',opacity:.92,offset:.5},{transform:'translate3d(112vw,0,0) rotate(14deg)',opacity:.68,offset:.86},{transform:'translate3d(142vw,0,0) rotate(14deg)',opacity:0}],{duration:2700,delay:250,iterations:Infinity,easing:'linear',fill:'both'});};play();const resume=()=>{if(document.visibilityState==='visible')play()};window.addEventListener('pageshow',play);window.addEventListener('focus',play);document.addEventListener('visibilitychange',resume);return()=>{animation?.cancel();window.removeEventListener('pageshow',play);window.removeEventListener('focus',play);document.removeEventListener('visibilitychange',resume)}},[visible]);
 if(!visible)return null;
 const enter=()=>{setLeaving(true);setTimeout(()=>{setVisible(false);sessionStorage.setItem("bha-splash-seen","1")},500)};
 return <div ref={rootRef} className={`bhaSplash ${leaving?"bhaSplashExit":""}`} role="dialog" aria-label="Welcome to Best Home Academy">
   <div className="bhaSplashGhostCrest" aria-hidden="true"><img src={officialBhaCrest} alt=""/></div>
   <div className="bhaSplashOrbit bhaSplashOrbitOne" aria-hidden="true"/><div className="bhaSplashOrbit bhaSplashOrbitTwo" aria-hidden="true"/>
   <div className="bhaSplashGlow"/><div className="bhaSplashPattern"/><div ref={beamRef} className="bhaSplashGoldBeam" aria-hidden="true"/>
   <main className="bhaSplashInner">
    <div className="bhaSplashCrest"><span className="bhaSplashSweep"/><span className="bhaSplashCrestHalo" aria-hidden="true"/><img src={officialBhaCrest} alt="Best Home Academy official crest" fetchPriority="high" decoding="sync"/></div>
    <p className="bhaSplashKicker">EKET · AKWA IBOM STATE</p>
    <h1>BEST HOME<br/><span>ACADEMY</span></h1>
    <div className="bhaSplashRule"/>
    <p className="bhaSplashMotto">Excellence Is Doing Ordinary Things<br/>Extraordinarily Well.</p>
    <button onClick={enter}>ENTER BHA <span>→</span></button>
   </main>
   <footer className="bhaSplashCredit"><span>DESIGNED &amp; DEVELOPED BY</span><strong>ETL GIS CONSULTING LLC</strong></footer>
 </div>
}
