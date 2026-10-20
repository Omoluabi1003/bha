import type {PracticeQuestion} from './nigerian-subjects';
export function auditPublishedSets(sets:PracticeQuestion[][]){const all=sets.flat();return {sets:sets.length,questions:all.length,uniqueIds:new Set(all.map(q=>q.id)).size,uniqueStems:new Set(all.map(q=>q.q.trim().toLowerCase().replace(/\s+/g,' '))).size};}
