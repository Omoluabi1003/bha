export function questionSetBoundary(setNumber:number,questionsPerSet:number){const start=(setNumber-1)*questionsPerSet;return {start,end:start+questionsPerSet};}
