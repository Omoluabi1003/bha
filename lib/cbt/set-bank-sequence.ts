export function bankSequenceRange(setNumber:number,questionsPerSet:number){const first=(setNumber-1)*questionsPerSet+1;return {first,last:first+questionsPerSet-1};}
