import {JAMB_UTME_SUBJECTS,type JambSubject} from './jamb-geocore';

export type GeoCoreBlueprint={subject:JambSubject;requiredQuestions:number;reviewRules:string[]};
const universal=[
  'Map every question to a current JAMB IBASS syllabus topic and explicit objective.',
  'Verify the keyed answer independently; structural validity alone is insufficient.',
  'Reject questions outside the current syllabus, ambiguous stems, multiple defensible answers and implausible distractors.',
  'Reject exact and near-duplicate questions before certification.',
  'Use JAMB IBASS materials for prescribed texts and subject-specific references where applicable.',
  'Do not infer certification from question count. Certification requires academic review.',
  'Preserve Nigerian educational terminology and examination context where the syllabus requires it.'
];
const special:Partial<Record<JambSubject,string[]>>={
  'Use of English':['Maintain deliberate coverage of comprehension/summary, lexis and structure, and oral forms.','Do not certify a 60-question sitting merely because 60 generic English questions exist.','Passage-dependent questions must remain attached to the passage they assess.'],
  Mathematics:['Recompute every numerical answer and verify notation, units and assumptions.','Balance questions across number, algebra, geometry/mensuration, trigonometry, calculus, statistics and probability as applicable to the current syllabus.'],
  Physics:['Recompute quantitative items, verify units/constants and reject scientifically ambiguous distractors.','Require coverage beyond elementary mechanics, including heat, waves, optics, electricity/magnetism and modern physics where prescribed.'],
  Chemistry:['Check equations, valency, nomenclature, stoichiometry and experimental claims.'],
  Biology:['Check taxonomy, physiology, ecology and genetics terminology against accepted secondary-school usage.'],
  Agriculture:['Validate Nigerian agricultural terminology, crops, livestock, soils, economics and extension context against IBASS.'],
  Geography:['Validate map-reading, physical, human, regional and environmental geography; Nigerian locations must be geographically accurate.'],
  Government:['Validate Nigerian constitutional and political-history claims and distinguish current institutions from historical ones.'],
  Economics:['Recompute quantitative economics items and validate Nigerian institutions/policy references where used.'],
  Commerce:['Validate business, trade, finance, insurance, transport and marketing terminology in Nigerian curriculum context.'],
  'Principles of Accounts':['Recompute accounting figures and enforce correct double-entry treatment and terminology.'],
  History:['Validate chronology, persons, polities and Nigerian/West African historical claims; reject invented dates or anachronisms.'],
  'Home Economics':['Validate nutrition, textiles, family living and consumer concepts against current syllabus terminology.'],
  'Physical and Health Education':['Validate anatomy, health, first aid and sport rules; reject medically unsafe or outdated claims.'],
  'Computer Studies':['Validate computing terminology and avoid obsolete claims presented as current facts.'],
  Art:['Validate art terminology, Nigerian/African art history, materials and processes.'],
  Music:['Validate notation, theory, instruments, African music and music-history claims.'],
  Igbo:['Require natural Nigerian Igbo and current JAMB language/literature conventions; never certify translated-English filler.'],
  Yoruba:['Require natural Nigerian Yoruba and current JAMB language/literature conventions; never certify translated-English filler.'],
  Hausa:['Require natural Nigerian Hausa and current JAMB language/literature conventions; never certify translated-English filler.'],
  Arabic:['Validate Arabic grammar, orthography and prescribed-material context.'],
  French:['Validate idiomatic French, grammar and reading context rather than literal English translation.'],
  'Literature-in-English':['Validate every prescribed-text question against the current JAMB materials list before certification.','Keep genre, literary-device and appreciation questions distinct from prescribed-text factual questions.'],
  'Christian Religious Studies':['Verify textual references and interpretation against the current syllabus scope.'],
  'Islamic Studies':['Verify Arabic terms, Qur’anic/Hadith references and interpretation against the current syllabus scope.']
};
export const jambGeoCoreBlueprints:Record<JambSubject,GeoCoreBlueprint>=Object.fromEntries(JAMB_UTME_SUBJECTS.map(subject=>[subject,{subject,requiredQuestions:subject==='Use of English'?60:40,reviewRules:[...universal,...(special[subject]??[])]}])) as Record<JambSubject,GeoCoreBlueprint>;
