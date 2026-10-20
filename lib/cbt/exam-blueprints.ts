export type BlueprintBand={topic:string;min:number;max:number;difficulty?:Partial<Record<'easy'|'medium'|'hard',number>>};
export type AuthoringBlueprint={exam:string;subject:string;bands:BlueprintBand[]};

/**
 * Authoring blueprints constrain candidate generation/review to syllabus topics.
 * These are BHA content-production controls, not claims of official examination weighting.
 */
export const authoringBlueprints:AuthoringBlueprint[]=[
  {exam:'JAMB',subject:'Use of English',bands:[{topic:'Comprehension',min:10,max:20},{topic:'Lexis and Structure',min:15,max:30},{topic:'Oral Forms',min:5,max:15}]},
  {exam:'JAMB',subject:'Mathematics',bands:[{topic:'Number and Numeration',min:5,max:15},{topic:'Algebra',min:8,max:18},{topic:'Geometry and Trigonometry',min:6,max:16},{topic:'Statistics',min:3,max:10}]},
  {exam:'JAMB',subject:'Igbo',bands:[{topic:'Asụsụ',min:10,max:25},{topic:'Agụmagụ',min:8,max:20},{topic:'Omenala',min:5,max:15}]},
];

export function blueprintFor(exam:string,subject:string){return authoringBlueprints.find(x=>x.exam===exam&&x.subject===subject)}
export function topicAllowed(exam:string,subject:string,topic:string){const blueprint=blueprintFor(exam,subject);if(!blueprint)return true;return blueprint.bands.some(x=>x.topic.toLocaleLowerCase()===topic.toLocaleLowerCase())}
