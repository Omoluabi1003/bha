export function questionBankRangeForSet(setNumber:number,questionsPerSet:number){const offset=(setNumber-1)*questionsPerSet;return {offset,limit:questionsPerSet};}
