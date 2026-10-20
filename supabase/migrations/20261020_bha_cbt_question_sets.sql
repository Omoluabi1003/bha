-- BHA CBT durable question-set model.
-- A numbered selector represents one complete published set/paper.

create table if not exists public.question_sets (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid references public.exams(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  set_number integer not null check (set_number > 0),
  title text,
  question_count integer not null check (question_count in (40,50,60)),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (exam_id, subject_id, set_number)
);

create table if not exists public.question_set_questions (
  question_set_id uuid not null references public.question_sets(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete restrict,
  position integer not null check (position > 0),
  primary key (question_set_id, position),
  unique (question_set_id, question_id)
);

create index if not exists question_sets_subject_idx on public.question_sets(subject_id, is_published);
create index if not exists question_set_questions_question_idx on public.question_set_questions(question_id);

alter table public.question_sets enable row level security;
alter table public.question_set_questions enable row level security;

-- Publication integrity is enforced by server/admin workflow: a set is publishable only
-- when its membership count equals question_count and all question IDs are distinct.
-- Student attempts should reference the selected question_set_id so historical attempts
-- retain the exact published paper used at the time of the attempt.
