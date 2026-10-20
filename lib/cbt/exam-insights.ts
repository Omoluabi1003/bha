import {PracticeQuestion} from './nigerian-subjects';
import {analyzePerformance} from './adaptive-exam';

export type ExamInsight={headline:string;strong:string[];focus:string[];message:string};

/** Deterministic, no-API feedback. A generative explanation layer can later paraphrase this safely. */
export function buildExamInsight(questions:PracticeQuestion[],answers:Record<number,number>):ExamInsight{
  const performance=analyzePerformance(questions,answers);
  const strong=performance.filter(x=>x.percent>=75).map(x=>x.topic).slice(0,3);
  const focus=performance.filter(x=>x.percent<60).map(x=>x.topic).slice(0,3);
  const correct=questions.reduce((n,q,i)=>n+(answers[i]===q.a?1:0),0);
  const percent=questions.length?Math.round(correct/questions.length*100):0;
  const headline=percent>=80?'Strong performance':percent>=60?'Developing well':'Revision recommended';
  const message=focus.length?`Prioritize ${focus.join(', ')} before your next sitting. Your next practice session should expose you to fresh questions in these areas.`:'No major weak topic was detected in this sitting. Continue with fresh mixed practice to confirm mastery.';
  return{headline,strong,focus,message};
}
