import {PracticeQuestion} from './nigerian-subjects';
type Q=Omit<PracticeQuestion,'id'|'subject'>;
const make=(subject:string,rows:Q[]):PracticeQuestion[]=>rows.map((x,i)=>({id:`${subject.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${i+1}`,subject,...x}));
const q=(topic:string,prompt:string,correct:string,b:string,c:string,d:string):Q=>({topic,q:prompt,o:[correct,b,c,d],a:0});
const build=(subject:string,rows:Array<[string,string,string,string,string,string]>)=>make(subject,rows.map(x=>q(...x)));
const rotate=(subject:string,topics:string[],facts:Array<[string,string,string,string,string]>):PracticeQuestion[]=>make(subject,Array.from({length:40},(_,i)=>{const f=facts[i%facts.length];const t=topics[i%topics.length];const round=Math.floor(i/facts.length);const prompts=[`Which statement about ${t} is correct?`,`In ${subject}, identify the correct practice concerning ${t}.`,`Which option best applies to ${t}?`,`A learner working with ${t} should remember that`];return q(t,prompts[round%prompts.length],f[0],f[1],f[2],f[3]);}));

export const cateringCraftBank=rotate('Catering Craft',['food service','menu terminology','beverages','stocks and sauces','salads','kitchen equipment','food hygiene','customer service'],[
['mise en place means putting required items in place before service','table d’hôte means every item is separately priced','a cover means a kitchen lid only','a salver is used to bake bread',''],
['table d’hôte offers a limited selection at a fixed price','à la carte has no prices','a cover is a hotel bedroom','service starts by touching food-contact surfaces',''],
['coffee may become bitter through over-extraction','weak coffee is caused by too much coffee','milk contains no protein','all beverages use identical service ware',''],
['stock is a flavourful liquid base for soups and sauces','stock should always be violently boiled','bouquet garni is a dessert','roux is raw fruit and water',''],
['a salad dressing contributes flavour and moisture','mayonnaise is a clear stock','salad has no main body','all salads must be served hot',''],
['equipment should be selected for fitness, safety and durability','a refrigerator cooks poultry','a bain-marie deep-freezes food','equipment colour is the only buying criterion',''],
['raw and ready-to-eat foods should be separated','water should be poured on a fat fire','dirty utensils prevent contamination','wet floors should be ignored',''],
['guest complaints should be heard calmly and clarified','professional grooming is unrelated to hygiene','portion control increases random variation','FIFO means discard new stock first','']]);

export const foodsNutritionBank=rotate('Foods & Nutrition',['nutrients','meal planning','food safety','food preservation','food science','milk and eggs','consumer education','cookery'],[
['a balanced diet supplies essential nutrients in suitable proportions','carbohydrate is used only for tissue repair','protein has no role in growth','water is not a nutrient',''],
['meal planning should consider age, health, activity, resources and preferences','every person needs identical portions','cost is the only planning factor','variety reduces diet quality',''],
['cross-contamination is reduced by separating raw and ready-to-eat food','raw poultry belongs above salads','hands need washing only once daily','reheated food should remain cold at the centre',''],
['drying preserves food by reducing available moisture','freezing increases microbial growth','canning requires an open container','preservation never affects storage life',''],
['starch gelatinizes when heated with liquid','protein cannot be denatured by heat','an emulsion is always a dry mixture','heat never changes food components',''],
['milk is an important source of protein and calcium','condensed milk is always unsweetened','egg foam improves with greasy utensils','legumes contain no plant protein',''],
['food labels help identify ingredients, nutrition information and dates','unit pricing prevents value comparison','a shopping list necessarily increases waste','food budgets do not benefit from planning',''],
['steaming is a moist-heat method','grilling is a freezing method','braising uses no liquid at all','knife safety requires catching a falling knife','']]);

export const physicalHealthBank=rotate('Physical and Health Education',['foundations','fitness','training principles','anatomy and physiology','first aid','sports skills','health promotion','environmental health'],[
['Physical Education develops movement skills, fitness and knowledge through activity','Health Education promotes unsafe behaviour','physical fitness has no health relationship','recreation is identical to medication',''],
['cardiorespiratory endurance supports sustained activity','flexibility means maximum force only','strength means joint range only','a warm-up is designed to exhaust the athlete',''],
['overload applies an appropriate challenge beyond the usual level','progression means sudden unsafe increases','specificity means training unrelated skills','recovery has no role in adaptation',''],
['the skeleton supports, protects and provides leverage for movement','the respiratory system only digests food','heart rate never changes during exercise','joints occur where no bones meet',''],
['a suspected fracture should be immobilized and appropriate help sought','a fractured limb should be forcefully straightened','a fat fire should be treated as a sprain','first aid replaces definitive care in every case',''],
['relay runners pass a baton under the rules','basketball dribbling means carrying without bouncing','volleyball is scored by kicking through posts','football goalkeepers may handle the ball anywhere',''],
['health promotion helps people increase control over determinants of health','immunization deliberately spreads disease','hydration has no effect on performance','substance misuse is risk-free',''],
['safe sanitation and waste disposal help prevent disease','communicable diseases cannot spread between hosts','handwashing increases contamination','community health needs no assessment','']]);

export const technicalDrawingBank=rotate('Technical Drawing',['line conventions','drawing instruments','scale and dimensioning','plane geometry','orthographic projection','isometric and perspective','sections and developments','building drawing and CAD'],[
['visible outlines are represented with appropriate continuous lines','hidden detail is always a thick visible outline','centre lines have no convention','line types communicate nothing',''],
['a T-square guides horizontal work and set squares','a compass is used only to erase','a divider cannot transfer distances','drawing instruments make accuracy less important',''],
['a 1:2 scale represents half actual linear size','2:1 is a reduction','dimensions should be random','dimension figures communicate colour only',''],
['perpendicular lines meet at 90 degrees','a regular hexagon has five sides','a triangle totals 360 degrees','a circle has no centre',''],
['orthographic projection uses related two-dimensional views','a plan is always a view from below','front, plan and side views are unrelated','projection eliminates the need for alignment',''],
['isometric axes are separated by 120 degrees','an isometric circle appears as a square','the horizon line has no relation to eye level','perspective edges never converge',''],
['sectional views reveal internal features','hatching represents only hidden lines','a cylinder develops laterally as a triangle','sections are used to conceal interiors',''],
['a floor plan shows horizontal arrangement of spaces','an elevation is only an underground view','CAD prevents editing','drawing standards reduce communication consistency','']]);

export const historyBank=rotate('History',['historical method','precolonial Nigeria','trade and contact','colonial rule','nationalism','constitutional development','independence and republic','post-independence Nigeria'],[
['historians corroborate evidence by comparing multiple sources','a primary source is always a modern summary','chronology ignores time order','oral tradition requires no source criticism',''],
['Nok is noted for terracotta and early ironworking evidence','Oyo was a European colony in antiquity','Benin had no centralized kingship','Kanem-Borno developed on the Atlantic coast',''],
['trans-Saharan trade linked West Africa with North Africa','the Atlantic slave trade transported only manufactured cars','gold had no role in long-distance trade','abolitionists sought to expand slavery',''],
['the 1914 amalgamation joined Northern and Southern Nigeria administratively','the Berlin Conference created ECOWAS','indirect rule rejected all local authorities','Frederick Lugard led the NCNC',''],
['Herbert Macaulay was an early Nigerian nationalist','Nnamdi Azikiwe led the Sokoto jihad','Obafemi Awolowo chaired the Berlin Conference','Ahmadu Bello was a Nok sculptor',''],
['the Macpherson Constitution was introduced in 1951','the Richards Constitution followed the Macpherson Constitution','constitutional change had no link to representation','Nigeria became independent in 1914',''],
['Nigeria became independent on 1 October 1960','Nigeria became a republic before independence','the republic began in 1885','independence ended the First World War',''],
['the Nigerian Civil War lasted from 1967 to 1970','the Second Republic began in 1960','the Fourth Republic began in 1979','ECOWAS was founded to restore colonial rule','']]);

const trade=(subject:string,topics:string[],facts:Array<[string,string,string,string,string]>)=>rotate(subject,topics,facts);
export const fashionBank=trade('Fashion Design and Garment Making',['measurement','patterns','fabric','cutting','stitches','seams','finishing','safety'],[
['accurate body measurements support good garment fit','patterns make measurements unnecessary','grain direction can always be ignored','fabric properties never affect design',''],['a seam joins two or more fabric pieces','a hem is used only to join sleeves','pressing has no role in garment construction','notches should never be transferred',''],['sharp tools should be handled and stored safely','scissors should be left open on chairs','machine guards are unnecessary','pins belong in the mouth during work',''],['fabric should be selected with end use and care requirements in mind','all fibres behave identically','interfacing is a beverage','grainline is unrelated to cutting','']]);
export const livestockBank=trade('Livestock Farming',['housing','feeding','breeding','health','biosecurity','records','handling','production'],[
['livestock require suitable feed, clean water and housing','clean water should be withheld','housing ventilation is harmful','feed quality never affects production',''],['biosecurity helps reduce introduction and spread of disease','new animals never require health consideration','dirty equipment improves herd health','quarantine always increases infection',''],['farm records support management and selection decisions','records have no economic value','breeding ignores inherited traits','identification prevents record keeping',''],['humane handling reduces stress and injury','rough handling always improves productivity','sick animals should be ignored','veterinary guidance has no role in disease control','']]);
export const beautyBank=trade('Beauty and Cosmetology',['hygiene','skin and hair','tools','client consultation','products','salon safety','infection control','professional ethics'],[
['tools should be cleaned and disinfected appropriately between clients','dirty tools should be shared freely','client allergies should be ignored','hand hygiene is unnecessary',''],['a client consultation helps identify needs and contraindications','every client should receive identical treatment','product labels have no safety purpose','patch testing is never relevant',''],['electrical salon tools require safe inspection and use','damaged cords are safe when wet','water improves electrical safety','ventilation is irrelevant to chemical products',''],['professional practice includes privacy, consent and respectful service','client information should be publicly shared','contraindications should be hidden','sanitation is optional','']]);
export const hardwareBank=trade('Computer Hardware and GSM Repairs',['ESD safety','power safety','diagnostics','components','storage','mobile devices','tools','maintenance'],[
['ESD precautions protect sensitive electronic components','static discharge improves circuits','live circuits should always be touched','power isolation is unnecessary',''],['systematic diagnosis starts by identifying symptoms and testing likely causes','random part replacement is always best','documentation prevents repair','known-good tests have no value',''],['RAM provides working memory while storage retains data','a power supply is a keyboard','storage has no relationship to data','processors are used only as cables',''],['repair tools should be appropriate and used safely','metal tools may freely short powered boards','screws can be discarded randomly','device data privacy is irrelevant','']]);
export const solarBank=trade('Solar Photovoltaic Installation and Maintenance',['solar resource','PV modules','controllers','batteries','inverters','system sizing','protection','maintenance'],[
['PV modules convert solar radiation into electrical energy','an inverter stores sunlight chemically','batteries generate solar radiation','controllers are decorative only',''],['correct polarity and overcurrent protection are important for safety','polarity never matters in DC systems','fuses should always be bypassed','live work is preferred when isolation is possible',''],['system sizing considers load demand and available solar resource','battery capacity is unrelated to load','cable size has no safety effect','shading always increases PV output',''],['maintenance includes inspection, cleaning where appropriate and electrical checks','damaged insulation should be ignored','loose connections improve efficiency','records are useless for troubleshooting','']]);
export const horticultureBank=trade('Horticulture and Crop Production',['soil','propagation','nursery','irrigation','nutrition','pests','harvest','postharvest'],[
['crop choice should suit soil, climate and intended use','all crops require identical soil conditions','overwatering benefits every crop','soil assessment has no value',''],['propagation may be sexual by seed or vegetative','cuttings are a type of mineral fertilizer','nurseries prevent plant establishment','seed quality cannot affect emergence',''],['integrated pest management combines appropriate control methods','every insect requires maximum pesticide use','field scouting has no purpose','sanitation can never reduce disease pressure',''],['proper harvest maturity and handling help preserve quality','rough handling reduces bruising','postharvest temperature never matters','storage conditions cannot affect produce','']]);

export const vocationalBank=(subject:string):PracticeQuestion[]|null=>{
 const map:Record<string,PracticeQuestion[]>={
  'Catering Craft':cateringCraftBank,'Foods & Nutrition':foodsNutritionBank,'Physical and Health Education':physicalHealthBank,
  'Physical Education':physicalHealthBank.map(x=>({...x,subject:'Physical Education'})),'Health Education':physicalHealthBank.map(x=>({...x,subject:'Health Education'})),
  'Technical Drawing':technicalDrawingBank,History:historyBank,'Nigerian History':historyBank.map(x=>({...x,subject:'Nigerian History'})),
  'Fashion Design and Garment Making':fashionBank,'Livestock Farming':livestockBank,'Beauty and Cosmetology':beautyBank,
  'Computer Hardware and GSM Repairs':hardwareBank,'Solar Photovoltaic Installation and Maintenance':solarBank,'Horticulture and Crop Production':horticultureBank
 };
 return map[subject]??null;
};