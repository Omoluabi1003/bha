export type IntegrityEventType='visibility-hidden'|'window-blur'|'copy'|'paste'|'context-menu';
export type IntegrityEvent={type:IntegrityEventType;at:number};
export type IntegritySummary={events:IntegrityEvent[];attentionChanges:number;clipboardAttempts:number};

const key=(sessionId:string)=>`bha-cbt-integrity:${sessionId}`;

export function readIntegrity(sessionId:string):IntegrityEvent[]{
  if(typeof window==='undefined')return[];
  try{const value=JSON.parse(sessionStorage.getItem(key(sessionId))||'[]');return Array.isArray(value)?value:[]}catch{return[]}
}

export function recordIntegrityEvent(sessionId:string,type:IntegrityEventType){
  if(typeof window==='undefined')return;
  const events=[...readIntegrity(sessionId),{type,at:Date.now()}].slice(-250);
  sessionStorage.setItem(key(sessionId),JSON.stringify(events));
}

export function summarizeIntegrity(sessionId:string):IntegritySummary{
  const events=readIntegrity(sessionId);
  return{events,attentionChanges:events.filter(e=>e.type==='visibility-hidden'||e.type==='window-blur').length,clipboardAttempts:events.filter(e=>e.type==='copy'||e.type==='paste'||e.type==='context-menu').length};
}

export function clearIntegrity(sessionId:string){if(typeof window!=='undefined')sessionStorage.removeItem(key(sessionId))}
