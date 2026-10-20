import type {PracticeQuestion} from './nigerian-subjects';
import {canPublishQuestionSet} from './set-publish-gate';
export function questionSetQualityGate(setNumber:number,questions:PracticeQuestion[],expected:number){return {setNumber,expected,actual:questions.length,passes:canPublishQuestionSet(questions,expected)};}
