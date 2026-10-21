import {getSessionConfig} from './session-config';
export const waecBankMinimum=(subject:string)=>getSessionConfig('WAEC',subject).questionCount;
