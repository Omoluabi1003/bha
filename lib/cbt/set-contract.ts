export type CBTSetContract={setNumber:number;questionsPerSet:number;questionIds:string[]};

export function assertSetContract(contract:CBTSetContract){
 if(contract.questionIds.length!==contract.questionsPerSet)throw new Error('Incomplete CBT question set.');
 if(new Set(contract.questionIds).size!==contract.questionIds.length)throw new Error('Duplicate question in CBT question set.');
 return contract;
}
