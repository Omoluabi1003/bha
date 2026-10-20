create table if not exists public.cbt_exam_sessions (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 exam text not null, subject text not null, mode text not null check(mode in('practice','simulation')),
 question_ids uuid[] not null, started_at timestamptz not null default now(), submitted_at timestamptz,
 score integer, total integer not null, status text not null default 'active' check(status in('active','submitted','expired')),
 unique(id,user_id)
);
alter table public.cbt_exam_sessions enable row level security;
drop policy if exists "cbt sessions own read" on public.cbt_exam_sessions;
create policy "cbt sessions own read" on public.cbt_exam_sessions for select using(auth.uid()=user_id);

create or replace function public.start_verified_cbt_session(p_exam text,p_subject text,p_mode text,p_count integer)
returns table(session_id uuid,question_id uuid,topic text,question_text text,options jsonb,position integer)
language plpgsql security definer set search_path=public as $$
declare sid uuid; ids uuid[];
begin
 if auth.uid() is null then raise exception 'authentication required'; end if;
 if p_mode not in('practice','simulation') or p_count<1 or p_count>60 then raise exception 'invalid session request'; end if;
 select array_agg(id) into ids from (select id from public.cbt_verified_questions where active=true and exam=p_exam and subject=p_subject order by random() limit p_count) q;
 if coalesce(array_length(ids,1),0)<>p_count then raise exception 'verified bank not ready'; end if;
 insert into public.cbt_exam_sessions(user_id,exam,subject,mode,question_ids,total) values(auth.uid(),p_exam,p_subject,p_mode,ids,p_count) returning id into sid;
 return query select sid,q.id,q.topic,q.question_text,q.options,u.ord::integer from unnest(ids) with ordinality u(id,ord) join public.cbt_verified_questions q on q.id=u.id order by u.ord;
end;$$;

create or replace function public.submit_verified_cbt_session(p_session_id uuid,p_answers jsonb)
returns table(score integer,total integer,unanswered integer)
language plpgsql security definer set search_path=public as $$
declare s public.cbt_exam_sessions; earned integer; missing integer;
begin
 select * into s from public.cbt_exam_sessions where id=p_session_id and user_id=auth.uid() for update;
 if not found then raise exception 'session not found'; end if;
 if s.status<>'active' then raise exception 'session already closed'; end if;
 select count(*) filter(where (p_answers ? q.id::text) and (p_answers->>q.id::text)::integer=q.correct_option),
        count(*) filter(where not(p_answers ? q.id::text))
 into earned,missing from public.cbt_verified_questions q where q.id=any(s.question_ids);
 update public.cbt_exam_sessions set score=earned,submitted_at=now(),status='submitted' where id=s.id;
 return query select earned,s.total,missing;
end;$$;
revoke all on function public.start_verified_cbt_session(text,text,text,integer) from public;
revoke all on function public.submit_verified_cbt_session(uuid,jsonb) from public;
grant execute on function public.start_verified_cbt_session(text,text,text,integer) to authenticated;
grant execute on function public.submit_verified_cbt_session(uuid,jsonb) to authenticated;
