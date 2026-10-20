export function assertSetNumber(value:number){if(!Number.isInteger(value)||value<1)throw new Error('Question set number must be a positive integer.');return value;}
