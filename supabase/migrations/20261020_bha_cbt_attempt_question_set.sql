alter table public.attempts
  add column if not exists question_set_id uuid references public.question_sets(id) on delete restrict;

create index if not exists attempts_question_set_idx on public.attempts(question_set_id);

comment on column public.attempts.question_set_id is
  'The exact numbered CBT question set selected for this attempt. Preserves historical paper membership.';
