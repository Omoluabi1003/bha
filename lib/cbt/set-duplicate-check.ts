import type {PracticeQuestion} from './nigerian-subjects';
import {normalizedQuestionIdentity} from './set-question-identity';
export function hasDuplicateQuestions(items:PracticeQuestion[]){return new Set(items.map(q=>q.id)).size!==items.length||new Set(items.map(q=>normalizedQuestionIdentity(q.q))).size!==items.length;}
