# Future Storage Model

When BHA moves the large question bank to a database, persist paper membership explicitly:

- exam
- subject
- set_number
- question_id
- position
- version
- active

The client should request only the selected set. Scoring should remain server-side for production attempts. This avoids shipping a 1,600–2,400 question subject bank to every learner while preserving the same Set 1–40 interface introduced here.
