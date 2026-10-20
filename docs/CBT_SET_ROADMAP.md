# BHA CBT Set Rollout

## Current implementation

The Developer Preview now separates Question Set selection from the in-test Question Navigator. A subject first opens a set selector. Selecting Set 1, Set 2, etc. opens a complete configured paper of 40, 50, or 60 questions. The navigator inside that paper then addresses Question 1 through Question N.

## Production path

The database schema in this PR introduces durable `question_sets` and `question_set_questions` membership and links attempts to the selected set. The next server-side activation step should read only published sets from Supabase and create attempts against a stable `question_set_id`.

## Content quality

Existing legacy banks that manufacture apparent volume by cycling a smaller base remain a known content-quality limitation. They must not be promoted as curated production sets. Those subjects should remain under review until enough genuinely reviewed questions exist for each published set.
