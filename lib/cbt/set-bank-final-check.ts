export function finalSetCheck(setNumber:number,bankSize:number,count:40|50|60){return {setNumber,ready:bankSize>=setNumber*count,required:setNumber*count};}
