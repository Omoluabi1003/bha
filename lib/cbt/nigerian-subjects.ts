import {englishBank,mathematicsBank,biologyBank,physicsBank} from './verified-major-banks';
import {governmentBank,economicsBank} from './verified-social-science-banks';
import {chemistryBank,agricultureBank,commerceBank,accountingBank,geographyBank} from './verified-secondary-banks';
import {civicEducationBank,crsBank,islamicStudiesBank,literatureBank,computerStudiesBank,marketingBank} from './verified-humanities-banks';
export const subjectCatalog={JAMB:["Use of English","Agriculture","Arabic","Art","Biology","Chemistry","Christian Religious Studies","Commerce","Economics","French","Geography","Government","Hausa","History","Home Economics","Igbo","Islamic Studies","Literature-in-English","Mathematics","Music","Physics","Principles of Accounts","Yoruba","Computer Studies","Physical and Health Education"],WAEC:["English Language","General Mathematics","Biology","Chemistry","Physics","Agriculture","Further Mathematics","Physical Education","Health Education","Foods & Nutrition","Geography","Technical Drawing","Nigerian History","Government","Christian Religious Studies","Islamic Studies","Hausa","Igbo","Yoruba","French","Arabic","Visual Art","Music","Literature-in-English","Home Management","Catering Craft","Accounting","Commerce","Marketing","Economics","Fashion Design and Garment Making","Livestock Farming","Beauty and Cosmetology","Computer Hardware and GSM Repairs","Solar Photovoltaic Installation and Maintenance","Horticulture and Crop Production"],NECO:["English Language","General Mathematics","Civic Education","Biology","Chemistry","Physics","Agricultural Science","Christian Religious Studies","Commerce","Economics","Financial Accounting","Geography","Government","Islamic Studies","Literature-in-English","Marketing"],"BHA INTERNAL":["English Language","General Mathematics","Civic Education","Biology","Chemistry","Physics","Agricultural Science","Further Mathematics","Government","Economics","Commerce","Financial Accounting","Geography","Christian Religious Studies","Islamic Studies","Literature-in-English","Computer Studies"]} as const;
export type ExamName=keyof typeof subjectCatalog;
export type PracticeQuestion={id:string;subject:string;topic:string;q:string;o:string[];a:number};
const fullBank=(subject:string):PracticeQuestion[]|null=>{if(subject==='Use of English'||subject==='English Language')return englishBank(subject);if(subject==='Mathematics'||subject==='General Mathematics')return mathematicsBank(subject);if(subject==='Biology')return biologyBank(subject);if(subject==='Physics')return physicsBank(subject);if(subject==='Government')return governmentBank;if(subject==='Economics')return economicsBank;if(subject==='Chemistry')return chemistryBank(subject);if(subject==='Agriculture'||subject==='Agricultural Science')return agricultureBank(subject);if(subject==='Commerce')return commerceBank(subject);if(subject==='Financial Accounting'||subject==='Accounting'||subject==='Principles of Accounts')return accountingBank(subject);if(subject==='Geography')return geographyBank(subject);if(subject==='Civic Education')return civicEducationBank;if(subject==='Christian Religious Studies')return crsBank(subject);if(subject==='Islamic Studies')return islamicStudiesBank;if(subject==='Literature-in-English')return literatureBank;if(subject==='Computer Studies')return computerStudiesBank;if(subject==='Marketing')return marketingBank;return null};

// GeoAware-Core gate: a numbered selector represents one question inside a complete
// exam set. A subject bank is selectable only when every question is genuinely
// distinct. Relabelled/recycled "Set N" entries are rejected rather than padded.
const normalized=(value:string)=>value.trim().toLowerCase().replace(/\s+/g,' ');
export function bankIntegrity(subject:string){
 const bank=fullBank(subject)?.map(x=>({...x,subject}))??[];
 const ids=new Set(bank.map(x=>x.id));
 const stems=new Set(bank.map(x=>normalized(x.q.replace(/\s*[\[(](?:practice\s+)?set\s+\d+[\])]?\s*$/i,''))));
 const hasSyntheticLabels=bank.some(x=>/\b(?:practice\s+)?set\s+\d+\b/i.test(x.q));
 const valid=bank.length>0&&ids.size===bank.length&&stems.size===bank.length&&!hasSyntheticLabels;
 return {valid,count:bank.length,bank:valid?bank:[],reason:valid?null:'Bank in Review: this subject does not yet contain a fully distinct question set.'};
}
export function questionsFor(subject:string):PracticeQuestion[]{return bankIntegrity(subject).bank;}
export function hasVerifiedBank(subject:string){return bankIntegrity(subject).valid;}
