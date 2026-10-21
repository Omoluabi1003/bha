export const WAEC_COMPONENT_POLICY={
 'English Language':['objective','essay','oral/component'],
 Biology:['objective','theory','practical/component'],
 Chemistry:['objective','theory','practical/component'],
 Physics:['objective','theory','practical/component'],
 French:['objective','essay','oral/component'],
 Arabic:['written','oral/component'],
 'Physical Education':['written','performance/component'],
 'Foods & Nutrition':['objective','essay','practical/component'],
 'Home Management':['objective','essay','practical/component'],
 Music:['written','performance/component']
} as const;

/** Components belong inside subject preparation, never as duplicate subject cards. */
export function waecComponentsFor(subject:string){return WAEC_COMPONENT_POLICY[subject as keyof typeof WAEC_COMPONENT_POLICY]??[];}
