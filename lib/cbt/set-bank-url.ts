export function setURL(exam:string,subject:string,setNumber:number){return `/cbt/preview?exam=${encodeURIComponent(exam)}&subject=${encodeURIComponent(subject)}&set=${setNumber}`;}
