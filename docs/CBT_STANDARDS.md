# BHA CBT Standards

This module follows the GeoAware-Core operating and review standard: durable architecture, clear primary actions, no temporary product logic, and merge only after validation.

## Nigerian exam fidelity

### JAMB UTME
- 180 total questions in 2 hours.
- Use of English is compulsory with 60 multiple-choice questions.
- Three other candidate-selected UTME subjects carry 40 multiple-choice questions each.
- Four options per question, A-D.
- Subject tabs, timer, answered count, navigation and end-exam behavior should resemble a professional CBT environment without copying proprietary UI.

### WASSCE / NECO
- Subject selection must match current Nigerian senior-secondary examination offerings.
- Objective paper counts and durations vary by subject.
- BHA must maintain subject-specific configuration as official patterns are verified.
- Where a subject-specific official count is not yet configured, use a clearly labelled 50-question practice block rather than pretending it is the exact examining-body paper format.

## Question bank policy
- Students must select exam first, then subject, then begin a full test session.
- Production sessions must draw from a sufficiently large verified bank so a 40, 50 or 60-question test never repeats the same seed item merely to reach the target count.
- Each item must carry exam, subject, topic, difficulty, four options, correct answer and review/approval status.
- Questions must be original BHA-authored items or lawfully licensed/public-domain material. Do not wholesale copy commercial past-question banks.
- No placeholder question may be shown to students as a real examination item.

## Merge gate
- Final PR preview must build successfully.
- Question-count and subject-selection acceptance criteria must be tested.
- Mobile and desktop navigation must remain clear.
- Accessibility, performance and security implications must be reviewed before merge.
