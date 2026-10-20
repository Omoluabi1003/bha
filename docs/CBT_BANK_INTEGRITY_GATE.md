# CBT Bank Publication Gate

Before a BHA question set can be published:

- The configured set size must be 40, 50, or 60 questions.
- The set must contain exactly that many question records.
- Every question ID within the set must be unique.
- The set number identifies the complete paper, not an individual question.
- The in-exam Question Navigator identifies individual questions 1 through N.
- A subject without enough reviewed questions remains Bank in Review.
- Duplicate wording with cosmetic labels such as `Set 2` does not count as a distinct question.
- Published set membership should be persisted, not regenerated for historical attempts.

This gate follows the GeoAware-Core rule that a passing build is necessary but not sufficient for merge readiness.
