import Link from "next/link";
import { ArrowLeft, GraduationCap, LockKeyhole } from "lucide-react";

const roles = ["Proprietor", "Staff", "Parent", "Student"];

export default function LoginPage(){
 return <main className="loginPage"><div className="loginShell"><Link href="/" className="back"><ArrowLeft size={16}/> Back to academy</Link><div className="loginBox"><div className="loginIntro"><div className="loginIcon"><GraduationCap/></div><p className="eyebrow">BHA SECURE PORTAL</p><h1>Welcome back.</h1><p>One secure gateway for the Best Home Academy community.</p><div className="roleList">{roles.map(r=><span key={r}>{r}</span>)}</div></div><div className="loginForm"><div className="security"><LockKeyhole size={18}/> Secure sign-in</div><label>Email or Student ID<input placeholder="Enter your email or student ID" disabled/></label><label>Password<input type="password" placeholder="Enter your password" disabled/></label><button disabled>Sign in</button><p className="coming">Authentication is being connected. No credentials are being collected yet.</p></div></div></div></main>
}
