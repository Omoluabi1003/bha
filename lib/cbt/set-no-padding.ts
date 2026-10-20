export function assertNoPadding(actual:number,required:number){if(actual<required)throw new Error('Incomplete CBT set cannot be padded or published.');return true;}
