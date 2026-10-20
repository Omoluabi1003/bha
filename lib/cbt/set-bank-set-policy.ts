import {setPolicy} from './set-policy';export function questionSetPolicy(exam:string,subject:string){const p=setPolicy(exam,subject);return {...p,selectorMeaning:'COMPLETE_SET' as const};}
