import {questionsFor} from './nigerian-subjects';
import {verifiedPool} from './question-validator';
import {getSessionConfig} from './session-config';

export function waecPickerReadiness(subject:string){
 const required=getSessionConfig('WAEC',subject).questionCount;
 const available=verifiedPool(questionsFor(subject)).length;
 return {subject,required,available,ready:available>=required};
}
