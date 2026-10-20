import type {PracticeQuestion} from './nigerian-subjects';
import {numberedSetAvailability} from './numbered-set-availability';
import {setPolicy} from './set-policy';
import type {NumberedSetSelectorItem} from './set-ui-model';
export function numberedSetSelectorModel(exam:string,subject:string,bank:PracticeQuestion[],count:number):NumberedSetSelectorItem[]{const {questionsPerSet}=setPolicy(exam,subject);return numberedSetAvailability(exam,subject,bank,count).map(s=>({number:s.setNumber,questionCount:questionsPerSet,enabled:s.available,label:s.available?`Set ${s.setNumber} · ${questionsPerSet} questions`:`Set ${s.setNumber} · Bank in Review`}));}
