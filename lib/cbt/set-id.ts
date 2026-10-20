export function questionSetId(exam:string,subject:string,setNumber:number){return `${exam.toLowerCase().replace(/\s+/g,'-')}:${subject.toLowerCase().replace(/\s+/g,'-')}:set-${setNumber}`;}
