# Practice Paper Engine

`lib/cbt/practice-papers.ts` is the single paper-construction utility for the preview flow. It clamps set numbers to 1–40, refuses undersized banks, deterministically ranks questions using the set number and question ID, and slices exactly the configured paper size.
