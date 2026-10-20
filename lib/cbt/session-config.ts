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
  if(exam==="WAEC")return {exam,subject,questionCount:40,durationMinutes:50,note:"WASSCE objective-style BHA practice set. Official paper patterns vary by subject, so subject-specific simulation can override this standard practice block as the bank expands."};
  if(exam==="NECO")return {exam,subject,questionCount:40,durationMinutes:50,note:"NECO SSCE objective-style BHA practice set. Official paper patterns vary by subject, so subject-specific simulation can override this standard practice block as the bank expands."};
  return {exam,subject,questionCount:40,durationMinutes:45,note:"BHA internal senior-secondary CBT practice set covering the Academy's core and practical subject catalogue."};
}
