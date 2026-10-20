import {validateQuestionSet} from './question-set';
import type {PracticeQuestion} from './nigerian-subjects';

const question=(id:string):PracticeQuestion=>({id,subject:'Test',topic:'Integrity',q:`Question ${id}`,o:['A','B','C','D'],a:0});

export function questionSetIntegritySelfCheck(){
  const complete40={setNumber:1,questions:Array.from({length:40},(_,i)=>question(`q-${i+1}`))};
  const duplicate40={setNumber:2,questions:Array.from({length:40},(_,i)=>question(`q-${i===39?1:i+1}`))};
  const shortSet={setNumber:3,questions:Array.from({length:39},(_,i)=>question(`s-${i+1}`))};

  if(!validateQuestionSet(complete40,40))throw new Error('A complete unique 40-question set must pass.');
  if(validateQuestionSet(duplicate40,40))throw new Error('A set with duplicate question IDs must fail.');
  if(validateQuestionSet(shortSet,40))throw new Error('An incomplete set must fail.');
  return true;
}
