export type ExamSessionConfig={
  exam:string;
  subject:string;
  questionCount:number;
  durationMinutes:number;
  note:string;
};

export function getSessionConfig(exam:string,subject:string):ExamSessionConfig{
  if(exam==="JAMB"){
    if(subject==="Use of English")return {exam,subject,questionCount:60,durationMinutes:40,note:"UTME Use of English practice block. Official UTME allocates 60 questions to Use of English within the full 2-hour, 180-question examination."};
    return {exam,subject,questionCount:40,durationMinutes:27,note:"UTME subject practice block. Official UTME allocates 40 questions to each of the three non-English subjects within the full 2-hour, 180-question examination."};
  }
  if(exam==="WAEC")return {exam,subject,questionCount:50,durationMinutes:60,note:"WASSCE objective-style practice block. Exact paper duration varies by subject, so BHA uses a 50-question practice session unless a subject-specific official pattern is configured."};
  if(exam==="NECO")return {exam,subject,questionCount:50,durationMinutes:60,note:"SSCE objective-style practice block. Exact paper pattern varies by subject; BHA uses a 50-question practice session pending subject-specific paper configuration."};
  return {exam,subject,questionCount:50,durationMinutes:60,note:"BHA internal senior-secondary CBT practice session."};
}
