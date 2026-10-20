# BHA CBT Numbered Question Set Standard

BHA follows the GeoAware-Core quality principle: product behavior must be explicit, durable, and never imply completeness that does not exist.

## Selector semantics

A numbered selector represents a complete question set, not a single question.

Examples:
- JAMB Use of English: Set 1 = 60 questions, Set 2 = another complete 60-question set.
- JAMB non-English subject: Set 1 = 40 questions, Set 2 = another complete 40-question set.
- WAEC, NECO, and BHA practice configurations: each numbered set contains the complete configured question count for that subject.

Inside a selected set, the Question Navigator numbers represent individual questions in that set.

## Integrity gate

A set must never be presented as production-ready when its underlying bank cannot supply the configured count. Repeating a small bank and relabelling duplicate questions as new practice sets is not acceptable.

The interface must distinguish clearly between:
1. Question Set selector: chooses a complete paper/set.
2. Question Navigator: chooses an individual question within the active set.

Question-set generation must use a proper shuffle rather than `sort(() => Math.random() - .5)`.

Production expansion should ultimately persist curated set membership in the database so every published set is stable, reviewable, auditable, and can be retired or replaced without changing historical attempts.
