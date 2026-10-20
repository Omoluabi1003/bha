export function assertNoCrossSetReuse(setIds:string[][]){const all=setIds.flat();if(new Set(all).size!==all.length)throw new Error('Published numbered sets recycle question records.');return true;}
