import type {ExamMode} from './adaptive-exam';
import type {PracticeQuestion} from './nigerian-subjects';
import {restoreServerExam,secondsUntil,startServerExam,submitServerExam,type ServerExamSession} from './server-session';

const KEY='bha-cbt-server-runtime';
export type RuntimeState={sessionId:string;exam:string;subject:string;mode:ExamMode;slot:number;answers:Record<number,number>;current:number};
export type RuntimeStart={kind:'server';session:ServerExamSession;secondsLeft:number;answers:Record<number,number>;current:number}|{kind:'fallback'};

function read():RuntimeState|null{try{const raw=sessionStorage.getItem(KEY);if(!raw)return null;const parsed=JSON.parse(raw);return parsed?.sessionId?parsed:null}catch{return null}}
export function saveRuntime(state:RuntimeState){try{sessionStorage.setItem(KEY,JSON.stringify(state))}catch{}}
export function clearRuntime(){try{sessionStorage.removeItem(KEY)}catch{}}

export async function startOrRestoreRuntime(exam:string,subject:string,mode:ExamMode,slot:number):Promise<RuntimeStart>{
 const saved=read();
 if(saved&&saved.exam===exam&&saved.subject===subject&&saved.mode===mode&&saved.slot===slot){const restored=await restoreServerExam(saved.sessionId);if(restored&&secondsUntil(restored.expiresAt)>0)return{kind:'server',session:restored,secondsLeft:secondsUntil(restored.expiresAt),answers:saved.answers||{},current:Number.isInteger(saved.current)?saved.current:0};clearRuntime()}
 const created=await startServerExam(exam,subject,mode);if(!created)return{kind:'fallback'};saveRuntime({sessionId:created.sessionId,exam,subject,mode,slot,answers:{},current:0});return{kind:'server',session:created,secondsLeft:secondsUntil(created.expiresAt),answers:{},current:0};
}
export function updateRuntime(session:ServerExamSession,exam:string,subject:string,mode:ExamMode,slot:number,answers:Record<number,number>,current:number){saveRuntime({sessionId:session.sessionId,exam,subject,mode,slot,answers,current})}
export async function finishRuntime(session:ServerExamSession,questions:PracticeQuestion[],answers:Record<number,number>){const result=await submitServerExam(session.sessionId,questions,answers);clearRuntime();return result}
