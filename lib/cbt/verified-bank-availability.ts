export type VerifiedBankAvailability={authenticated:boolean;count:number;available:boolean};

export async function fetchVerifiedBankAvailability(exam:string,subject:string):Promise<VerifiedBankAvailability|null>{
  try{
    const params=new URLSearchParams({exam,subject});
    const response=await fetch(`/api/cbt/verified-questions/availability?${params.toString()}`,{cache:'no-store'});
    if(!response.ok)return null;
    const data=await response.json();
    return {authenticated:Boolean(data.authenticated),count:Number(data.count)||0,available:Boolean(data.available)};
  }catch{return null}
}
