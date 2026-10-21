import {waecPickerReadiness} from './waec-picker-readiness';
export function waecReadinessLabel(subject:string){const x=waecPickerReadiness(subject);return x.ready?`ADAPTIVE CBT · ${x.required} QUESTIONS`:`BANK IN REVIEW · ${x.available}/${x.required} VERIFIED`;}
