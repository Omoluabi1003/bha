import {waecComponentsFor} from './waec-component-policy';
export function waecComponentNote(subject:string){const parts=waecComponentsFor(subject);return parts.length?`${subject} preparation includes ${parts.join(', ')} coverage within the parent subject.`:'';}
