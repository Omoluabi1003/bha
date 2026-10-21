export const WAEC_PRESCRIBED_MATERIAL_REVIEW_SUBJECTS=['Literature-in-English','Hausa','Igbo','Yoruba','Arabic'] as const;
export function requiresWaecPrescribedMaterialReview(subject:string){return (WAEC_PRESCRIBED_MATERIAL_REVIEW_SUBJECTS as readonly string[]).includes(subject);}
