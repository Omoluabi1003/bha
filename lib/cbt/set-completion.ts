export function setCompletion(answered:number,total:number){return {answered,total,unanswered:Math.max(0,total-answered),complete:answered===total};}
