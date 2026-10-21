import {subjectCatalog} from './nigerian-subjects';

export const WAEC_2026_2027_SUBJECTS=[
'English Language','General Mathematics','Biology','Chemistry','Physics','Agriculture','Further Mathematics','Physical Education','Health Education','Foods & Nutrition','Geography','Technical Drawing','Nigerian History','Government','Christian Religious Studies','Islamic Studies','Hausa','Igbo','Yoruba','French','Arabic','Visual Art','Music','Literature-in-English','Home Management','Catering Craft','Accounting','Commerce','Marketing','Economics','Fashion Design and Garment Making','Livestock Farming','Beauty and Cosmetology','Computer Hardware and GSM Repairs','Solar Photovoltaic Installation and Maintenance','Horticulture and Crop Production'
] as const;

export const WAEC_COMPONENT_ONLY_LABELS=['Oral English','Practical Biology','Practical Chemistry','Practical Physics'] as const;

/** Protects the picker from drifting back to duplicate paper/component cards. */
export function auditWaecCatalog(){
 const actual=[...subjectCatalog.WAEC];
 const missing=WAEC_2026_2027_SUBJECTS.filter(x=>!actual.includes(x));
 const unexpected=actual.filter(x=>!(WAEC_2026_2027_SUBJECTS as readonly string[]).includes(x));
 const componentCards=WAEC_COMPONENT_ONLY_LABELS.filter(x=>(actual as string[]).includes(x));
 return {valid:missing.length===0&&unexpected.length===0&&componentCards.length===0,missing,unexpected,componentCards};
}
