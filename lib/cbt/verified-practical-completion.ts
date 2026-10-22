import type {PracticeQuestion} from './nigerian-subjects';
const q=(id:string,subject:string,topic:string,text:string,options:string[],answer:number):PracticeQuestion=>({id,subject,topic,q:text,o:options,a:answer});
export const practicalBiologyCompletion:PracticeQuestion[]=[
q('pbio-c1','Practical Biology','Microscopy','Which adjustment should be made first when bringing a specimen into focus under low power?',['Use the coarse adjustment knob','Close the diaphragm completely','Add immersion oil','Change immediately to high power'],0),
q('pbio-c2','Practical Biology','Food tests','A blue-black colour after adding iodine solution indicates the presence of',['protein','starch','reducing sugar','lipid'],1),
q('pbio-c3','Practical Biology','Food tests','During a Benedict test, a brick-red precipitate after heating indicates',['reducing sugar','starch','protein','vitamin C'],0),
q('pbio-c4','Practical Biology','Ecology','A quadrat is most suitable for estimating the abundance of',['grasses in a field','birds in flight','fish in a river','butterflies in a forest'],0),
q('pbio-c5','Practical Biology','Measurement','If a drawing is 60 mm long and the specimen is 20 mm long, the magnification is',['×2','×3','×20','×40'],1),
q('pbio-c6','Practical Biology','Osmosis','A potato strip placed in concentrated salt solution becomes limp mainly because',['water leaves its cells by osmosis','salt enters by active transport','starch is digested','cell walls dissolve'],0),
q('pbio-c7','Practical Biology','Transpiration','In a potometer experiment, movement of an air bubble is used to estimate',['rate of water uptake','rate of respiration','leaf area','root pressure only'],0),
q('pbio-c8','Practical Biology','Specimen study','A feature that identifies an insect among arthropods is the presence of',['three pairs of legs','four pairs of legs','two pairs of antennae','many body segments'],0),
q('pbio-c9','Practical Biology','Experimental design','The purpose of a control setup in a biological experiment is to',['provide a basis for comparison','increase the temperature','change two variables at once','guarantee the expected result'],0),
q('pbio-c10','Practical Biology','Enzymes','When testing the effect of temperature on amylase, which factor should be kept constant?',['Amount of enzyme used','Temperature of each tube','Time at every reading only','Colour of the test tube'],0),
q('pbio-c11','Practical Biology','Leaf structure','Stomata can be observed most directly from a prepared',['leaf epidermal peel','root cap section','woody stem surface','seed coat'],0),
q('pbio-c12','Practical Biology','Classification','A specimen with parallel leaf venation and fibrous roots is most likely a',['monocotyledon','dicotyledon','gymnosperm','fern prothallus'],0)
];
export const practicalChemistryCompletion:PracticeQuestion[]=[
q('pchem-c1','Practical Chemistry','Titration','Before filling a burette with acid, it should finally be rinsed with',['the acid solution','distilled water only','the alkali solution','indicator solution'],0),
q('pchem-c2','Practical Chemistry','Titration','The bottom of the meniscus should be read at eye level mainly to avoid',['parallax error','evaporation','neutralisation','contamination'],0),
q('pchem-c3','Practical Chemistry','Titration','Concordant titres are readings that',['closely agree with one another','are all above 50 cm³','use different indicators','are obtained without a pipette'],0),
q('pchem-c4','Practical Chemistry','Gas tests','A gas that relights a glowing splint is',['oxygen','hydrogen','carbon dioxide','ammonia'],0),
q('pchem-c5','Practical Chemistry','Gas tests','Hydrogen is identified by its characteristic',['pop with a lighted splint','bleaching of litmus','limewater cloudiness','pungent smell'],0),
q('pchem-c6','Practical Chemistry','Qualitative analysis','Carbon dioxide is confirmed when it',['turns limewater milky','relights a glowing splint','turns blue litmus red then bleaches it','gives a pop sound'],0),
q('pchem-c7','Practical Chemistry','Separation','Which apparatus is essential for separating an insoluble solid from a liquid by filtration?',['Filter funnel and filter paper','Burette and pipette','Evaporating dish only','Gas jar and lid'],0),
q('pchem-c8','Practical Chemistry','Heating','A test tube being heated should be pointed',['away from people','towards the observer','straight downward','towards the reagent shelf'],0),
q('pchem-c9','Practical Chemistry','Measurement','A pipette is used in titration to deliver',['a fixed accurate volume','any approximate volume','only distilled water','the indicator'],0),
q('pchem-c10','Practical Chemistry','Indicators','Phenolphthalein is colourless in an acidic solution and typically becomes',['pink in alkaline solution','green in alkaline solution','blue in acidic solution','orange in neutral solution'],0),
q('pchem-c11','Practical Chemistry','Crystallisation','Crystals are commonly obtained from a solution by',['concentrating it and allowing it to cool','adding excess filter paper','vigorous shaking only','passing gas through it'],0),
q('pchem-c12','Practical Chemistry','Laboratory safety','When diluting concentrated acid, the safer procedure is to',['add acid slowly to water','add water rapidly to acid','mix both in a sealed bottle','heat the acid before adding water'],0)
];
export const practicalPhysicsCompletion:PracticeQuestion[]=[
q('pphy-c1','Practical Physics','Measurement','To reduce parallax when reading a metre rule, the eye should be',['vertically above the mark','far to the left','at the end of the rule','closed on one side'],0),
q('pphy-c2','Practical Physics','Pendulum','For a simple pendulum experiment, timing 20 oscillations instead of one mainly reduces',['percentage timing error','the length of the string','gravitational acceleration','the mass of the bob'],0),
q('pphy-c3','Practical Physics','Graphs','The gradient of a straight-line graph is calculated as',['change in vertical value divided by change in horizontal value','vertical value plus horizontal value','horizontal value divided by total readings','product of the two intercepts'],0),
q('pphy-c4','Practical Physics','Electricity','An ammeter is connected in a circuit',['in series','in parallel only','across an open switch','without regard to polarity'],0),
q('pphy-c5','Practical Physics','Electricity','A voltmeter used to measure potential difference across a resistor is connected',['in parallel with the resistor','in series with the resistor','in place of the power supply','across the ammeter only'],0),
q('pphy-c6','Practical Physics','Optics','In a ray-box experiment, the angle of incidence is measured between the incident ray and the',['normal','mirror surface','screen edge','refracted ray'],0),
q('pphy-c7','Practical Physics','Density','Density of a regular solid can be determined from its',['mass divided by volume','volume divided by mass','mass plus volume','weight multiplied by volume'],0),
q('pphy-c8','Practical Physics','Moments','For a metre rule balanced horizontally on a pivot, equilibrium requires clockwise moment to',['equal anticlockwise moment','exceed anticlockwise moment','be zero regardless of loads','equal the total mass'],0),
q('pphy-c9','Practical Physics','Springs','Within the elastic limit, extension of a spring is directly proportional to',['applied force','square of its length','temperature only','diameter of the stand'],0),
q('pphy-c10','Practical Physics','Experimental error','Repeating a measurement and taking the mean mainly helps to reduce',['random error','zero error that is never corrected','unit conversion','instrument range'],0),
q('pphy-c11','Practical Physics','Optics','A sharp image on a screen formed by a convex lens is',['real','virtual','always upright','formed without refraction'],0),
q('pphy-c12','Practical Physics','Circuit safety','Before changing connections in a school electricity experiment, the student should first',['open the switch','increase the voltage','short-circuit the resistor','remove the ammeter scale'],0)
];
