-- Student-facing CBT source of truth. Only academically approved candidates may be promoted here.
create table if not exists public.cbt_verified_questions (
  id uuid primary key,
  candidate_id uuid unique not null references public.cbt_question_candidates(id) on delete restrict,
  exam text not null,
  subject text not null,
  topic text not null,
  syllabus_ref text not null,
  difficulty text not null check (difficulty in ('easy','medium','hard')),
  question_text text not null,
  options jsonb not null check (jsonb_typeof(options)='array' and jsonb_array_length(options)=4),
  correct_option integer not null check (correct_option between 0 and 3),
  rationale text not null,
  approved_by uuid not null references auth.users(id) on delete restrict,
  approved_at timestamptz not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists cbt_verified_questions_exam_subject_idx on public.cbt_verified_questions(exam,subject,active,topic);
alter table public.cbt_verified_questions enable row level security;

drop policy if exists "verified questions authenticated read" on public.cbt_verified_questions;
drop policy if exists "verified questions proprietor manage" on public.cbt_verified_questions;
create policy "verified questions authenticated read" on public.cbt_verified_questions for select
using (auth.uid() is not null and active=true);
create policy "verified questions proprietor manage" on public.cbt_verified_questions for all
using (public.current_role()='proprietor') with check (public.current_role()='proprietor');

-- Promotion is atomic and idempotent. A candidate must already be approved by academic review.
create or replace function public.promote_cbt_candidate(p_candidate_id uuid)
returns uuid
language plpgsql
security definer
set search_path=public
as $$
declare c public.cbt_question_candidates; qid uuid;
begin
  if auth.uid() is null or public.current_role() <> 'proprietor' then raise exception 'not authorized'; end if;
  select * into c from public.cbt_question_candidates where id=p_candidate_id for update;
  if not found then raise exception 'candidate not found'; end if;
  if c.status <> 'approved' or c.reviewed_by is null or c.reviewed_at is null then raise exception 'candidate is not academically approved'; end if;
  insert into public.cbt_verified_questions(id,candidate_id,exam,subject,topic,syllabus_ref,difficulty,question_text,options,correct_option,rationale,approved_by,approved_at)
  values(c.id,c.id,c.exam,c.subject,c.topic,c.syllabus_ref,c.difficulty,c.question_text,c.options,c.correct_option,c.rationale,c.reviewed_by,c.reviewed_at)
  on conflict(candidate_id) do update set active=true
  returning id into qid;
  return qid;
end;
$$;
revoke all on function public.promote_cbt_candidate(uuid) from public;
grant execute on function public.promote_cbt_candidate(uuid) to authenticated;
