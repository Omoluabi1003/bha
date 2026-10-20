export function questionDeficitForSet(distinctApprovedQuestions:number,setNumber:number,questionsPerSet:number){return Math.max(0,setNumber*questionsPerSet-distinctApprovedQuestions);}
