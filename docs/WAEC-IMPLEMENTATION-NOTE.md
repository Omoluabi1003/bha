# Implementation note

The student picker continues to use `verifiedPool(questionsFor(subject))`, so this phase fixes readiness at the source instead of bypassing validation or lowering duplicate thresholds. The validator remains the same safety gate used elsewhere in BHA CBT.
