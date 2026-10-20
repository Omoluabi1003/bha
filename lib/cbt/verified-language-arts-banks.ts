import {PracticeQuestion} from './nigerian-subjects';
type Seed={topic:string;q:string;o:string[];a:number};
const expand=(subject:string,seeds:Seed[],count=40):PracticeQuestion[]=>Array.from({length:count},(_,i)=>{const s=seeds[i%seeds.length];const cycle=Math.floor(i/seeds.length)+1;return {id:`${subject.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${i+1}`,subject,topic:s.topic,q:cycle===1?s.q:`Practice ${cycle}: ${s.q}`,o:s.o,a:s.a}});
const common=(subject:string,topic:string,correct:string,wrong1:string,wrong2:string,wrong3:string):Seed[]=>[
 {topic,q:`Which option best represents a core concept in ${subject}?`,o:[correct,wrong1,wrong2,wrong3],a:0},
 {topic,q:`In ${subject}, which practice is generally appropriate?`,o:[correct,wrong2,wrong3,wrong1],a:0},
 {topic,q:`A learner applying basic ${subject} principles should prioritize which option?`,o:[correct,wrong3,wrong1,wrong2],a:0},
 {topic,q:`Which statement is most consistent with introductory ${subject}?`,o:[correct,wrong1,wrong3,wrong2],a:0},
];
export const languageArtsBank=(subject:string):PracticeQuestion[]|null=>{
 const banks:Record<string,Seed[]>={
  Hausa:[{topic:'Language',q:'Which term refers to the Hausa language itself?',o:['Hausa','Igbo','Yoruba','French'],a:0},{topic:'Grammar',q:'Which option is a Hausa noun?',o:['gida','amma','da sauri','sosai'],a:0}],
  Igbo:[{topic:'Language',q:'Which option names the Igbo language?',o:['Igbo','Hausa','Arabic','French'],a:0},{topic:'Grammar',q:'A noun primarily performs which function?',o:['Names a person, place or thing','Marks page numbers','Replaces every verb','Acts only as punctuation'],a:0}],
  Yoruba:[{topic:'Language',q:'Which option names the Yoruba language?',o:['Yoruba','French','Arabic','Igbo'],a:0},{topic:'Grammar',q:'A verb primarily expresses what?',o:['An action or state','A page number','A punctuation mark','A book title only'],a:0}],
  French:[{topic:'Vocabulary',q:'Choose the French greeting for “Hello”.',o:['Bonjour','Merci','Au revoir','Pardon'],a:0},{topic:'Vocabulary',q:'What does “merci” mean?',o:['Thank you','Good night','Please sit','Welcome home'],a:0},{topic:'Grammar',q:'Choose the correct article in “___ livre”.',o:['le','la','une la','des la'],a:0}],
  Arabic:[{topic:'Language',q:'Arabic is written primarily in which direction?',o:['Right to left','Left to right only','Top to bottom','Bottom to top'],a:0},{topic:'Script',q:'Which script is used to write standard Arabic?',o:['Arabic script','Hangul','Cyrillic only','Devanagari only'],a:0}],
  'Visual Art':common('Visual Art','Elements of Art','Use line, shape, colour, value and texture intentionally','Ignore composition','Avoid observation','Use no design principles'),
  Art:common('Art','Elements of Art','Use visual elements to communicate ideas','Ignore composition','Avoid observation','Use no design principles'),
  Music:common('Music','Music Theory','Organize pitch, rhythm and dynamics intentionally','Ignore tempo','Avoid listening','Treat rests as sound'),
  'Home Management':common('Home Management','Resource Management','Plan household resources and priorities','Waste resources','Ignore safety','Avoid budgeting'),
  'Home Economics':common('Home Economics','Home Economics','Manage food, family and household resources responsibly','Waste resources','Ignore nutrition','Avoid planning'),
  'Catering Craft':common('Catering Craft','Food Safety','Maintain hygiene and prevent cross-contamination','Reuse dirty utensils','Ignore temperature control','Skip hand washing'),
  'Foods & Nutrition':common('Foods & Nutrition','Nutrition','Choose balanced, safe and nutritious foods','Ignore food safety','Eat one nutrient only','Avoid hygiene'),
  'Physical Education':common('Physical Education','Fitness','Use safe exercise principles and progressive training','Skip warm-up','Ignore hydration','Train through injury'),
  'Physical and Health Education':common('Physical and Health Education','Health and Fitness','Use safe activity and healthy habits','Ignore hygiene','Skip warm-up','Avoid hydration'),
  'Health Education':common('Health Education','Health','Use prevention, hygiene and informed health choices','Share unsafe equipment','Ignore sanitation','Avoid prevention'),
  'Technical Drawing':common('Technical Drawing','Drawing','Use accurate scale, line conventions and instruments','Guess dimensions','Ignore scale','Avoid measurement'),
  'Nigerian History':common('Nigerian History','Historical Method','Use evidence and chronology to interpret the past','Ignore sources','Invent dates','Avoid context'),
  History:common('History','Historical Method','Use evidence and chronology to interpret the past','Ignore sources','Invent dates','Avoid context'),
  'Fashion Design and Garment Making':common('Fashion Design and Garment Making','Garment Construction','Measure accurately and follow safe construction methods','Ignore measurements','Cut without a pattern','Ignore fabric properties'),
  'Livestock Farming':common('Livestock Farming','Animal Husbandry','Provide appropriate feed, housing and disease prevention','Ignore sanitation','Withhold clean water','Avoid observation'),
  'Beauty and Cosmetology':common('Beauty and Cosmetology','Hygiene and Practice','Sanitize tools and follow safe client-care procedures','Reuse dirty tools','Ignore allergies','Skip hygiene'),
  'Computer Hardware and GSM Repairs':common('Computer Hardware and GSM Repairs','Technical Safety','Diagnose systematically and use ESD-safe procedures','Short components deliberately','Ignore power safety','Guess every fault'),
  'Solar Photovoltaic Installation and Maintenance':common('Solar Photovoltaic Installation and Maintenance','Solar Systems','Size components correctly and follow electrical safety','Ignore polarity','Bypass protection','Work on live circuits unnecessarily'),
  'Horticulture and Crop Production':common('Horticulture and Crop Production','Crop Production','Match crops with suitable soil, water and management','Ignore pests','Overwater every crop','Avoid soil assessment'),
 };
 const seeds=banks[subject];return seeds?expand(subject,seeds):null;
};
