# WAEC 2026 CBT readiness

BHA's WAEC subject catalog follows WAEC Nigeria's 2026/2027 entry-regulation list. English Language and General Mathematics are the two available core subjects for 2026/2027. Oral and practical/performance papers are components of their parent WASSCE subjects and are not exposed as duplicate standalone subject cards.

## Release guardrail

`auditWaecReadiness()` evaluates every WAEC subject card through the same `verifiedPool()` used by the CBT UI. A card is ready only when the accepted pool reaches the configured examination question count.

The vocational-bank generator now produces structurally distinct items across repeated topic cycles so legitimate questions are not collapsed by near-duplicate filtering into the former 32/40 pattern.

This is a structural readiness check. It does not by itself constitute academic certification of every question against a WAEC syllabus or prescribed text. Literature and language prescribed-text alignment remains a separate academic-review requirement.
