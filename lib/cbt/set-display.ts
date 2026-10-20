export function setDisplay(setNumber:number,count:number,ready:boolean){return {title:`Question Set ${setNumber}`,subtitle:ready?`${count} questions`:'Bank in Review',disabled:!ready};}
