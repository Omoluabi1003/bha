export function questionSetIdentity(exam:string,subject:string,setNumber:number){return [exam,subject,`set-${setNumber}`].join('::');}
