import {waecReleaseGate} from './waec-release-gate';
import {auditWaecQuestionIds} from './waec-bank-identity';

export function waecReleaseReport(){
 const gate=waecReleaseGate();
 const ids=auditWaecQuestionIds();
 return {...gate,questionIds:ids,ready:gate.ready&&ids.valid};
}
