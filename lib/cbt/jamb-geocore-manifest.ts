import {JAMB_UTME_SUBJECTS,type JambSubject,JAMB_2026_SOURCE} from './jamb-geocore';

export type GeoCoreDomain={name:string;objective:string};
export type GeoCoreSubjectManifest={subject:JambSubject;syllabusVersion:'2026';authority:'JAMB IBASS';syllabusUrl:string;materialsUrl:string;domains:GeoCoreDomain[]};

const domains:Record<JambSubject,string[]>={
'Agriculture':['General Agriculture','Agronomy','Animal Production','Agricultural Economics and Extension'],
'Arabic':['Comprehension','Grammar','Composition','Arabic Literature and Culture'],
'Art':['General Art Knowledge','Drawing and Design','Art History and Appreciation','Materials and Processes'],
'Biology':['Variety of Organisms','Form and Functions','Ecology','Heredity and Evolution'],
'Chemistry':['Separation and Purification','Chemical Combination','States of Matter and Gas Laws','Atomic Structure and Bonding','Acids Bases and Salts','Redox and Electrochemistry','Organic Chemistry','Applied Chemistry'],
'Christian Religious Studies':['Creation and Covenant','Leadership in Israel','Prophets and Justice','Life and Teachings of Jesus','Early Church and Apostolic Teaching'],
'Commerce':['Occupation and Production','Trade','Business Units','Finance and Banking','Insurance','Transportation and Communication','Marketing','Business Management and Regulation'],
'Economics':['Basic Economic Concepts','Demand Supply and Price','Production and Cost','Market Structures','National Income and Public Finance','Money Banking and Inflation','International Trade and Development'],
'French':['Written Comprehension','Lexis and Structure','Written Expression','Francophone Culture'],
'Geography':['Practical Geography and Map Reading','Physical Geography','Human Geography','Regional Geography of Nigeria and Africa','Economic Geography and Environment'],
'Government':['Basic Concepts of Government','Political Institutions','Constitutions and Systems','Public Administration','Nigeria Political Development','Foreign Policy and International Organizations'],
'Hausa':['Language and Grammar','Comprehension','Oral and Written Literature','Culture and Usage'],
'History':['Land and Peoples of Nigeria','Early States and Societies','European Contact and Colonial Rule','Nationalism and Independence','Nigeria since Independence','West Africa and Wider African History'],
'Home Economics':['Home Management','Food and Nutrition','Clothing and Textiles','Family Living and Consumer Education'],
'Igbo':['Language and Grammar','Comprehension and Usage','Oral Literature','Written Literature and Culture'],
'Islamic Studies':['Qur’an and Hadith','Tawhid and Fiqh','Life of the Prophet','Islamic History and Civilization','Ethics and Social Relations'],
'Literature-in-English':['Drama','Prose','Poetry','Literary Appreciation and Terms','Prescribed Texts'],
'Mathematics':['Number and Numeration','Algebra','Geometry and Mensuration','Trigonometry','Calculus','Statistics and Probability'],
'Music':['Rudiments and Theory','Harmony and Composition','History and Literature of Music','African Music','Aural Awareness'],
'Physics':['Measurements and Units','Motion and Forces','Work Energy and Power','Heat and Thermodynamics','Waves and Sound','Light and Optics','Electricity and Magnetism','Atomic and Nuclear Physics'],
'Principles of Accounts':['Nature and Principles of Accounting','Books of Original Entry and Ledgers','Final Accounts','Control Accounts and Reconciliation','Partnership and Company Accounts','Public Sector and Manufacturing Accounts'],
'Use of English':['Comprehension and Summary','Lexis and Structure','Oral Forms'],
'Yoruba':['Language and Grammar','Comprehension and Usage','Oral Literature','Written Literature and Culture'],
'Computer Studies':['Computer Fundamentals','Hardware and Software','Data Representation','Operating Systems and Applications','Programming and Algorithms','Networking and Internet','Database and Information Management','ICT Ethics Security and Society'],
'Physical and Health Education':['Physical Fitness and Conditioning','Athletics and Games','Gymnastics Dance and Recreation','Human Anatomy and Physiology','Health Education and Nutrition','First Aid Safety and Disease Prevention','Sports Administration and Ethics']
};

export const jambGeoCoreManifest:Record<JambSubject,GeoCoreSubjectManifest>=Object.fromEntries(JAMB_UTME_SUBJECTS.map(subject=>[subject,{subject,syllabusVersion:'2026',authority:'JAMB IBASS',syllabusUrl:JAMB_2026_SOURCE.syllabus,materialsUrl:JAMB_2026_SOURCE.materials,domains:domains[subject].map(name=>({name,objective:`Assess knowledge and application within the current JAMB IBASS ${subject} syllabus domain: ${name}.`}))}])) as Record<JambSubject,GeoCoreSubjectManifest>;

export function manifestFor(subject:string){return jambGeoCoreManifest[subject as JambSubject]??null;}
