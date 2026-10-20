# Implementation Summary

The developer CBT preview now has a dedicated paper-selection state between subject selection and question answering.

`buildPracticePaper` receives the verified subject bank, configured question count and set number. It returns a deterministic set without duplicate questions inside that paper. The UI exposes 40 set cards and preserves the existing timer, answers, skipped-question review, submission and scoring flow after a set is opened.
