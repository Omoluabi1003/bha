export const bhaAcademicSubjects=[
  "English",
  "Oral English",
  "Mathematics",
  "Further Mathematics",
  "Chemistry",
  "Physics",
  "Biology",
  "Economics",
  "Government",
  "CRS",
  "Literature in English",
  "Commerce",
  "Accounting",
  "Geography",
  "Computer Studies",
  "Practical Biology",
  "Practical Physics",
  "Practical Chemistry",
] as const;

export type BHAAcademicSubject=(typeof bhaAcademicSubjects)[number];
