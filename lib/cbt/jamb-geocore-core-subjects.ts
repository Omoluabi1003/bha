import type {JambSubject} from './jamb-geocore';

export type GeoCoreDomain={topic:string;objectives:string[];sourceUrl:string};
export type GeoCoreSubjectProfile={subject:JambSubject;domains:GeoCoreDomain[];notes:string[]};

const ibass=(name:string)=>`https://ibass.jamb.gov.ng/assets/uploads/${name}.pdf`;

export const jambCoreSubjectProfiles:Partial<Record<JambSubject,GeoCoreSubjectProfile>>={
  'Use of English':{
    subject:'Use of English',
    domains:[
      {topic:'Comprehension and Summary',objectives:['derive meaning from passages','identify main points and supporting details','infer purpose, attitude and implication','summarise relevant information'],sourceUrl:ibass('Use-of-English')},
      {topic:'Lexis and Structure',objectives:['use vocabulary in context','identify appropriate grammatical structures','interpret idiomatic and figurative usage','recognise sentence patterns and meaning relations'],sourceUrl:ibass('Use-of-English')},
      {topic:'Oral Forms',objectives:['distinguish vowel and consonant sounds','recognise stress patterns','recognise emphatic stress','identify rhyming and sound contrasts'],sourceUrl:ibass('Use-of-English')}
    ],
    notes:['A 60-question bank must not be certified from generic grammar questions alone.','Passage-dependent items must preserve the passage context used to validate the keyed answer.']
  },
  Mathematics:{
    subject:'Mathematics',
    domains:[
      {topic:'Number and Numeration',objectives:['solve problems involving number bases, fractions, decimals, percentages, indices, logarithms and surds'],sourceUrl:ibass('Mathematics')},
      {topic:'Algebra',objectives:['solve equations and inequalities','manipulate algebraic expressions','work with variation, functions and progressions'],sourceUrl:ibass('Mathematics')},
      {topic:'Geometry and Trigonometry',objectives:['apply plane and coordinate geometry','solve mensuration problems','apply trigonometric ratios and identities'],sourceUrl:ibass('Mathematics')},
      {topic:'Calculus',objectives:['differentiate and integrate elementary functions','apply rates of change, maxima/minima and area concepts'],sourceUrl:ibass('Mathematics')},
      {topic:'Statistics',objectives:['interpret statistical data','calculate measures of location and dispersion','solve elementary probability problems'],sourceUrl:ibass('Mathematics')}
    ],
    notes:['Every numerical key must be independently recomputed before certification.','Units, notation, diagrams and assumptions must be sufficient for one defensible answer.']
  },
  Physics:{
    subject:'Physics',
    domains:[
      {topic:'Measurements and Units',objectives:['apply SI units, dimensions, measurement and error concepts'],sourceUrl:ibass('Physics')},
      {topic:'Mechanics and Properties of Matter',objectives:['solve motion, force, energy, momentum, equilibrium, elasticity and fluid problems'],sourceUrl:ibass('Physics')},
      {topic:'Heat and Thermodynamics',objectives:['apply temperature, thermal expansion, gas-law and heat-transfer concepts'],sourceUrl:ibass('Physics')},
      {topic:'Waves, Sound and Light',objectives:['analyse wave properties, sound, reflection, refraction, lenses and optical phenomena'],sourceUrl:ibass('Physics')},
      {topic:'Electricity and Magnetism',objectives:['apply electrostatics, current electricity, circuits, magnetic fields and electromagnetic induction'],sourceUrl:ibass('Physics')},
      {topic:'Modern Physics',objectives:['apply atomic, nuclear, photoelectric and elementary electronics concepts'],sourceUrl:ibass('Physics')}
    ],
    notes:['Every quantitative answer must be independently recomputed.','Constants and units must be stated where omission could make the item ambiguous.','Scientific claims must match secondary-school JAMB syllabus treatment rather than advanced exceptions.']
  }
};
