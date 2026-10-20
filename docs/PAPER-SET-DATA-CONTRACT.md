# Paper Set Data Contract

A practice paper is identified by exam, subject and set number.

```text
{ exam, subject, setNumber }
```

`setNumber` is an integer from 1 through 40. The current verified question bank and configured paper size are passed to `buildPracticePaper`. The function deterministically selects unique questions for that paper.

This keeps the presentation layer independent of future storage. A later database migration can persist authored paper membership explicitly without changing the student-facing Set 1–40 workflow.
