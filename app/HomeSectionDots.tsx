"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
const pages=[
  {href:"/",label:"Home"},
  {href:"/academics",label:"Academics"},
  {href:"/cbt",label:"CBT Practice"},
  {href:"/admissions",label:"Admissions"},
  {href:"/digital-campus",label:"Digital Campus"},
  {href:"/portal/fees",label:"School Fees"}
];
export default function HomeSectionDots(){const pathname=usePathname();const[open,setOpen]=useState(false);const ref=useRef<HTMLElement>(null);useEffect(()=>{const close=(e:PointerEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setOpen(false)};document.addEventListener("pointerdown",close);return()=>document.removeEventListener("pointerdown",close)},[]);return <nav ref={ref} className={`bhaPageRail${open?" open":""}`} aria-label="BHA page navigation"><button className="bhaPageRailTrigger" type="button" aria-expanded={open} aria-label={open?"Close BHA page menu":"Open BHA page menu"} onClick={()=>setOpen(v=>!v)}><span/><span/><span/></button><div className="bhaPageRailMenu" aria-hidden={!open}>{pages.map(page=><Link key={page.href} href={page.href} className={pathname===page.href?"active":""} onClick={()=>setOpen(false)}>{page.label}</Link>)}</div></nav>}
