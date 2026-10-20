export const subjectCatalog = {
 JAMB:["Use of English","Agriculture","Arabic","Art","Biology","Chemistry","Christian Religious Studies","Commerce","Economics","French","Geography","Government","Hausa","History","Home Economics","Igbo","Islamic Studies","Literature-in-English","Mathematics","Music","Physics","Principles of Accounts","Yoruba","Computer Studies","Physical and Health Education"],
 WAEC:["English Language","General Mathematics","Biology","Chemistry","Physics","Agriculture","Further Mathematics","Physical Education","Health Education","Foods & Nutrition","Geography","Technical Drawing","Nigerian History","Government","Christian Religious Studies","Islamic Studies","Hausa","Igbo","Yoruba","French","Arabic","Visual Art","Music","Literature-in-English","Home Management","Catering Craft","Accounting","Commerce","Marketing","Economics","Fashion Design and Garment Making","Livestock Farming","Beauty and Cosmetology","Computer Hardware and GSM Repairs","Solar Photovoltaic Installation and Maintenance","Horticulture and Crop Production"],
 NECO:["English Language","General Mathematics","Biology","Chemistry","Physics","Agricultural Science","Civic Education","Christian Religious Studies","Commerce","Economics","Financial Accounting","Geography","Government","Islamic Studies","Literature-in-English","Marketing"],
 "BHA INTERNAL":["English Language","General Mathematics","Biology","Chemistry","Physics","Agricultural Science","Further Mathematics","Government","Economics","Commerce","Financial Accounting","Geography","Christian Religious Studies","Islamic Studies","Literature-in-English","Civic Education","Computer Studies"]
} as const;

export type ExamName=keyof typeof subjectCatalog;

export type PracticeQuestion={subject:string;topic:string;q:string;o:string[];a:number};

const core:PracticeQuestion[]=[
 {subject:"English Language",topic:"Lexis and Structure",q:"Choose the option that best completes the sentence: Neither the principal nor the teachers ___ aware of the change.",o:["was","were","is","has been"],a:1},
 {subject:"Use of English",topic:"Lexis and Structure",q:"Choose the option that best completes the sentence: Neither the principal nor the teachers ___ aware of the change.",o:["was","were","is","has been"],a:1},
 {subject:"General Mathematics",topic:"Algebra",q:"If 3x - 7 = 20, find x.",o:["7","8","9","10"],a:2},
 {subject:"Mathematics",topic:"Algebra",q:"If 3x - 7 = 20, find x.",o:["7","8","9","10"],a:2},
 {subject:"Further Mathematics",topic:"Functions",q:"If f(x)=2x²-3x+1, find f(2).",o:["1","2","3","4"],a:2},
 {subject:"Biology",topic:"Ecology",q:"Which relationship benefits both organisms involved?",o:["Parasitism","Mutualism","Predation","Competition"],a:1},
 {subject:"Chemistry",topic:"Acids, Bases and Salts",q:"Which substance turns blue litmus paper red?",o:["An acid","An alkali","A neutral salt","Distilled water"],a:0},
 {subject:"Physics",topic:"Electricity",q:"A 12 V battery produces a current of 3 A through a resistor. What is the resistance?",o:["2 Ω","4 Ω","9 Ω","36 Ω"],a:1},
 {subject:"Agriculture",topic:"Soil Science",q:"Which soil type has the highest water-holding capacity?",o:["Sandy soil","Clay soil","Gravel","Loamy sand"],a:1},
 {subject:"Agricultural Science",topic:"Soil Science",q:"Which soil type has the highest water-holding capacity?",o:["Sandy soil","Clay soil","Gravel","Loamy sand"],a:1},
 {subject:"Government",topic:"Constitution",q:"The principle that divides governmental powers among the legislature, executive and judiciary is called",o:["delegated legislation","separation of powers","collective responsibility","franchise"],a:1},
 {subject:"Economics",topic:"Demand",q:"Other things being equal, a fall in the price of a normal good will usually cause its quantity demanded to",o:["fall","remain unchanged","rise","become zero"],a:2},
 {subject:"Commerce",topic:"Trade",q:"A document sent by a seller to a buyer showing details and prices of goods supplied is an",o:["invoice","cheque","receipt","debit card"],a:0},
 {subject:"Principles of Accounts",topic:"Double Entry",q:"When cash is introduced into a business by the owner, the cash account is",o:["debited","credited","closed","ignored"],a:0},
 {subject:"Financial Accounting",topic:"Double Entry",q:"When cash is introduced into a business by the owner, the cash account is",o:["debited","credited","closed","ignored"],a:0},
 {subject:"Geography",topic:"Weather and Climate",q:"The instrument used to measure atmospheric pressure is the",o:["rain gauge","barometer","hygrometer","anemometer"],a:1},
 {subject:"Civic Education",topic:"Citizenship",q:"One major responsibility of a citizen in a democracy is to",o:["obey lawful authority","ignore elections","refuse taxation","prevent public debate"],a:0},
 {subject:"Christian Religious Studies",topic:"New Testament",q:"According to the Gospels, Jesus taught the Lord's Prayer to his",o:["disciples","Roman soldiers","tax collectors","Sadducees"],a:0},
 {subject:"Islamic Studies",topic:"Articles of Faith",q:"Belief in the oneness of Allah is known as",o:["Tawhid","Zakat","Sawm","Hajj"],a:0},
 {subject:"Literature-in-English",topic:"Literary Terms",q:"A deliberate contrast between what is expected and what actually happens is",o:["irony","alliteration","euphemism","metre"],a:0},
 {subject:"Computer Studies",topic:"Computer Fundamentals",q:"Which component performs arithmetic and logical operations in a computer?",o:["ALU","keyboard","monitor","printer"],a:0},
 {subject:"Marketing",topic:"Marketing Mix",q:"Which of these is one of the traditional four Ps of marketing?",o:["Place","Population","Policy","Patent"],a:0},
 {subject:"History",topic:"Nigerian Nationalism",q:"The struggle by Nigerians for self-government before independence is commonly described as",o:["nationalism","feudalism","mercantilism","apartheid"],a:0},
 {subject:"Nigerian History",topic:"Nationalism",q:"The struggle by Nigerians for self-government before independence is commonly described as",o:["nationalism","feudalism","mercantilism","apartheid"],a:0},
 {subject:"Physical and Health Education",topic:"Fitness",q:"Which component of physical fitness is the ability of a joint to move through its full range?",o:["Flexibility","Speed","Power","Balance"],a:0},
 {subject:"Physical Education",topic:"Fitness",q:"Which component of physical fitness is the ability of a joint to move through its full range?",o:["Flexibility","Speed","Power","Balance"],a:0},
 {subject:"Health Education",topic:"Personal Health",q:"Which practice best helps prevent the spread of communicable diseases?",o:["Regular handwashing","Sharing drinking cups","Avoiding vaccination","Keeping wounds uncovered"],a:0}
];

export function questionsFor(subject:string):PracticeQuestion[]{
 const direct=core.filter(q=>q.subject===subject);
 if(direct.length)return direct;
 return [{subject,topic:"BHA Question Bank",q:`The ${subject} question bank is being prepared against the approved Nigerian curriculum. This subject is selectable, but no unverified placeholder questions will be used.`,o:["Return to subject selection","Use another subject","Await BHA-approved questions","All of the above"],a:3}];
}
