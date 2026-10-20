import type {PracticeQuestion} from './nigerian-subjects';
export function assertUniqueBank(bank:PracticeQuestion[]){const ids=new Set(bank.map(q=>q.id));const stems=new Set(bank.map(q=>q.q.trim().toLowerCase().replace(/\s+/g,' ')));if(ids.size!==bank.length||stems.size!==bank.length)throw new Error('Question bank contains duplicated content.');return bank;}
