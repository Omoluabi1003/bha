import {JAMB_UTME_SUBJECTS,type JambSubject} from './jamb-geocore';

export type GeoCoreBlueprint={subject:JambSubject;requiredQuestions:number;reviewRules:string[]};
const universal=[
  'Map every question to a current JAMB IBASS syllabus topic and explicit objective.',
  'Verify the keyed answer independently; structural validity alone is insufficient.',
  'Reject questions outside the current syllabus, ambiguous stems, multiple defensible answers and implausible distractors.',
  'Reject exact and near-duplicate questions before certification.',
  'Use JAMB IBASS materials for prescribed texts and subject-specific references where applicable.'
];
const special:Partial<Record<JambSubject,string[]>>={
  'Use of English':['Maintain deliberate coverage of comprehension/summary, lexis and structure, and oral forms.','Do not certify a 60-question sitting merely because 60 generic English questions exist.'],
  Mathematics:['Recompute every numerical answer and verify notation, units and assumptions.','Balance questions across the syllabus rather than overfilling elementary arithmetic.'],
  Physics:['Recompute quantitative items, verify units/constants and reject scientifically ambiguous distractors.'],
  Chemistry:['Check equations, valency, nomenclature, stoichiometry and experimental claims.'],
  Biology:['Check taxonomy, physiology, ecology and genetics terminology against accepted secondary-school usage.'],
  Igbo:['Require natural Nigerian Igbo and current JAMB language/literature conventions; never certify translated-English filler.'],
  Yoruba:['Require natural Nigerian Yoruba and current JAMB language/literature conventions; never certify translated-English filler.'],
  Hausa:['Require natural Nigerian Hausa and current JAMB language/literature conventions; never certify translated-English filler.'],
  Arabic:['Validate Arabic grammar, orthography and prescribed-material context.'],
  French:['Validate idiomatic French, grammar and reading context rather than literal English translation.'],
  'Literature-in-English':['Validate every prescribed-text question against the current JAMB materials list before certification.'],
  'Christian Religious Studies':['Verify textual references and interpretation against the current syllabus scope.'],
  'Islamic Studies':['Verify Arabic terms, Qur’anic/Hadith references and interpretation against the current syllabus scope.']
};
export const jambGeoCoreBlueprints:Record<JambSubject,GeoCoreBlueprint>=Object.fromEntries(JAMB_UTME_SUBJECTS.map(subject=>[subject,{subject,requiredQuestions:subject==='Use of English'?60:40,reviewRules:[...universal,...(special[subject]??[])]}])) as Record<JambSubject,GeoCoreBlueprint>;
