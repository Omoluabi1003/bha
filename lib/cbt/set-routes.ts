export function numberedSetRoute(exam:string,subject:string,setNumber:number){const p=new URLSearchParams({exam,subject,set:String(setNumber)});return `/cbt/preview?${p.toString()}`;}
