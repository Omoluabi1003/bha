# BHA CBT Bank Integrity Standard

BHA follows the GeoAware-Core principle that visible completeness must represent real completeness.

## Numbered selector meaning

Each numbered selector represents a complete question set for that numbered practice/exam slot.

- Selector 1 opens Question Set 1.
- Selector 2 opens Question Set 2.
- Each set contains the configured 40, 50 or 60 distinct questions for that exam/subject format.
- Questions inside a set must be individually navigable, autosaved, reviewable and scored.
- Sets must not be manufactured by relabelling or recycling the same small pool.

## Professional gate

A subject is not advertised as ready merely because code can generate the requested array length. Repeated stems, relabelled `Set N` questions, and duplicated IDs are rejected by the bank integrity gate. Such subjects remain unavailable as `Bank in Review` until genuinely distinct banks are supplied.

## Session construction

The exam/session layer chooses the required number of distinct questions from an approved subject bank for the selected set. Question order may be randomized for a new attempt, but the selected question IDs and order must remain stable for that attempt so refresh, autosave, skip/review, timing and final submission all refer to the same question set.
