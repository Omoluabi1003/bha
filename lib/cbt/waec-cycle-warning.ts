import {WAEC_CURRENT_CBT_ENTRY_CYCLE} from './waec-exam-cycle';
export function waecProfileNeedsReview(year:number){return year>WAEC_CURRENT_CBT_ENTRY_CYCLE.to;}
