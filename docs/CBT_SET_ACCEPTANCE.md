# Question Set Acceptance Criteria

A BHA CBT subject is eligible for numbered question sets only when:

1. Its bank contains at least the configured number of questions for one complete paper.
2. Question IDs are unique.
3. The bank contains no synthetic `[Set N]` or `(Practice set N)` padding markers.
4. The numbered selector opens a complete 40, 50, or 60-question set according to session configuration.
5. Question numbers inside the active set remain a separate Question Navigator.
6. The production database persists question-set membership and the selected set on the attempt.

This prevents legacy padded banks from being presented as professionally complete while allowing genuinely complete banks to use the new set-selector workflow.
