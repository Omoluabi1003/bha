create table if not exists public.admission_applications (
 id uuid primary key default gen_random_uuid(),
 reference text not null unique default ('BHA-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,10))),
 student_name text not null,
 category text not null,
 guardian_name text not null,
 phone text not null,
 email text,
 relationship text,
 status text not null default 'submitted' check (status in ('submitted','under_review','approved','rejected','withdrawn')),
 submitted_at timestamptz not null default now(),
 reviewed_at timestamptz,
 reviewed_by uuid references auth.users(id),
 review_note text
);
create index if not exists admission_applications_status_idx on public.admission_applications(status,submitted_at desc);
alter table public.admission_applications enable row level security;
drop policy if exists "admissions staff read" on public.admission_applications;
create policy "admissions staff read" on public.admission_applications for select using(public.current_role() in ('proprietor','staff'));
drop policy if exists "admissions staff update" on public.admission_applications;
create policy "admissions staff update" on public.admission_applications for update using(public.current_role() in ('proprietor','staff')) with check(public.current_role() in ('proprietor','staff'));
revoke all on public.admission_applications from anon,authenticated;
grant select,update on public.admission_applications to authenticated;
create or replace function public.submit_admission_application(p_student_name text,p_category text,p_guardian_name text,p_phone text,p_email text default null,p_relationship text default null) returns table(id uuid,reference text,status text,submitted_at timestamptz) language plpgsql security definer set search_path=public as $$
declare created public.admission_applications;begin
 if length(trim(coalesce(p_student_name,'')))<2 or length(trim(coalesce(p_guardian_name,'')))<2 then raise exception 'name required';end if;
 if p_category not in ('Going to SS1','SS2 / SS3','WAEC / JAMB Retake','Secondary School Graduate') then raise exception 'invalid category';end if;
 if length(regexp_replace(coalesce(p_phone,''),'\D','','g'))<7 then raise exception 'valid phone required';end if;
 if p_email is not null and length(trim(p_email))>0 and trim(p_email)!~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' then raise exception 'invalid email';end if;
 insert into public.admission_applications(student_name,category,guardian_name,phone,email,relationship) values(trim(p_student_name),p_category,trim(p_guardian_name),trim(p_phone),nullif(lower(trim(coalesce(p_email,''))),''),nullif(trim(coalesce(p_relationship,'')),'')) returning * into created;
 return query select created.id,created.reference,created.status,created.submitted_at;
end;$$;
revoke all on function public.submit_admission_application(text,text,text,text,text,text) from public;
grant execute on function public.submit_admission_application(text,text,text,text,text,text) to anon,authenticated;
