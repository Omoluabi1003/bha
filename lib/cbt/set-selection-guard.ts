export function assertSetAvailable(available:boolean,setNumber:number){if(!available)throw new Error(`Question Set ${setNumber} is not yet available.`);return true;}
