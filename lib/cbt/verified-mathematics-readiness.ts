import type { PracticeQuestion } from './nigerian-subjects';

// Distinct Mathematics items used to complete the structurally verified UTME bank.
// Academic GeoCore certification remains a separate review process.
export const mathematicsReadiness: PracticeQuestion[] = [
  {
    id: 'utme-math-readiness-1',
    subject: 'Mathematics',
    topic: 'Calculus',
    q: 'If y = 3x² + 4x - 5, find dy/dx when x = 2.',
    o: ['8', '12', '16', '20'],
    a: 2,
  },
  {
    id: 'utme-math-readiness-2',
    subject: 'Mathematics',
    topic: 'Coordinate Geometry',
    q: 'Find the midpoint of the line segment joining (-2, 3) and (6, 7).',
    o: ['(2, 5)', '(4, 10)', '(2, 4)', '(8, 10)'],
    a: 0,
  },
];
