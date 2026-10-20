export function setNumbers(page:number,pageSize:number){const start=(Math.max(1,page)-1)*pageSize+1;return Array.from({length:pageSize},(_,i)=>start+i);}
