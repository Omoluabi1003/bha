export type CBTSetSelection={exam:string;subject:string;setNumber:number};
export function setSelectionKey(s:CBTSetSelection){return `${s.exam}:${s.subject}:set-${s.setNumber}`;}
