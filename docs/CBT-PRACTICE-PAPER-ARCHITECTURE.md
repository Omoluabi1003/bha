# BHA CBT Practice Paper Architecture

BHA treats the numbered 1–40 controls as complete practice papers, not individual question selectors.

## Flow

Exam → Subject → Practice Paper Set → Questions → Result

- Every supported subject exposes 40 numbered practice-paper slots.
- JAMB Use of English uses the configured 60-question paper size.
- Other JAMB subjects use the configured 40-question paper size.
- WAEC, NECO and BHA Internal use their subject/session configuration.
- Selecting Set 7 always produces the same stable Set 7 from the current verified bank.
- No question is duplicated within a single paper.
- Different sets can overlap while a subject has fewer verified questions than the number required for 40 disjoint papers.

## Question-bank growth

The UI and paper architecture are ready for 40 complete sets. Content should be expanded with original BHA questions aligned to official syllabi and examination objectives. Do not bulk-copy copyrighted commercial past-question booklets.

For 40 completely disjoint JAMB papers, a subject needs 1,600 verified questions. Use of English needs 2,400 verified questions.
