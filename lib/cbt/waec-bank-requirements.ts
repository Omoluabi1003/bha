import {subjectCatalog} from './nigerian-subjects';
import {getSessionConfig} from './session-config';

export const WAEC_BANK_REQUIREMENTS=Object.fromEntries(subjectCatalog.WAEC.map(subject=>[subject,getSessionConfig('WAEC',subject).questionCount])) as Record<(typeof subjectCatalog.WAEC)[number],number>;
