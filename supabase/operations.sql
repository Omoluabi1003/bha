-- Best Home Academy operational layer
create type application_status as enum ('submitted','reviewing','accepted','declined','enrolled');
create table admissions (
 id uuid primary key default gen_random_uuid(),
 student_name text not null,
 category text not null,
 guardian_name text not null,
 guardian_phone text not null,
 guardian_email text,
 relationship text,
 status application_status not null default 'submitted',
 created_at timestamptz not null default now()
);
create table subjects (id uuid primary key default gen_random_uuid(), name text unique not null, active boolean not null default true);
create table attendance (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references students(id) on delete cascade,
 attendance_date date not null, present boolean not null, recorded_by uuid references profiles(id),
 unique(student_id,attendance_date)
);
create table results (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references students(id) on delete cascade,
 subject_id uuid not null references subjects(id), session_id uuid not null references academic_sessions(id),
 assessment text not null, score numeric(5,2) not null check(score>=0), recorded_by uuid references profiles(id), created_at timestamptz not null default now()
);
create table announcements (id uuid primary key default gen_random_uuid(), title text not null, body text not null, audience app_role, created_by uuid references profiles(id), created_at timestamptz not null default now());
create table receipts (id uuid primary key default gen_random_uuid(), payment_id uuid unique not null references payments(id), receipt_no text unique not null, issued_at timestamptz not null default now());
alter table admissions enable row level security; alter table subjects enable row level security; alter table attendance enable row level security; alter table results enable row level security; alter table announcements enable row level security; alter table receipts enable row level security;
create policy "proprietor admissions" on admissions for all using (current_role()='proprietor') with check(current_role()='proprietor');
create policy "authenticated subjects" on subjects for select to authenticated using (true);
create policy "proprietor subjects" on subjects for all using (current_role()='proprietor') with check(current_role()='proprietor');
create policy "proprietor attendance" on attendance for all using (current_role()='proprietor') with check(current_role()='proprietor');
create policy "staff attendance" on attendance for all using (current_role()='staff') with check(current_role()='staff');
create policy "student attendance" on attendance for select using (student_id in (select id from students where user_id=auth.uid()));
create policy "parent attendance" on attendance for select using (student_id in (select student_id from parent_students where parent_id=auth.uid()));
create policy "proprietor results" on results for all using (current_role()='proprietor') with check(current_role()='proprietor');
create policy "staff results" on results for all using (current_role()='staff') with check(current_role()='staff');
create policy "student results" on results for select using (student_id in (select id from students where user_id=auth.uid()));
create policy "parent results" on results for select using (student_id in (select student_id from parent_students where parent_id=auth.uid()));
create policy "role announcements" on announcements for select using (audience is null or audience=current_role());
create policy "proprietor announcements" on announcements for all using (current_role()='proprietor') with check(current_role()='proprietor');
create policy "payer receipts" on receipts for select using (payment_id in (select id from payments where payer_id=auth.uid()));
create policy "proprietor receipts" on receipts for select using (current_role()='proprietor');
