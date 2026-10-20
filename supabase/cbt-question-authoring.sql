-- Controlled authoring queue for BHA CBT.
-- Generated candidates never enter live verified banks automatically.
create table if not exists public.cbt_question_candidates (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  exam text not null,
  topic text not null,
  syllabus_ref text not null,
  difficulty text not null check (difficulty in ('easy','medium','hard')),
  question_text text not null,
  options jsonb not null check (jsonb_typeof(options)='array' and jsonb_array_length(options)=4),
  correct_option integer not null check (correct_option between 0 and 3),
  rationale text not null,
  source text not null check (source in ('ai','human')),
  status text not null default 'draft' check (status in ('draft','rejected','review','approved')),
  rejection_reasons jsonb not null default '[]'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists cbt_question_candidates_review_idx on public.cbt_question_candidates(status,exam,subject,topic);
alter table public.cbt_question_candidates enable row level security;

-- No student-facing read policy is intentionally defined.
-- Service-side/admin authoring workflows can manage this queue without exposing candidates to exam clients.
