-- Best Home Academy core data model
create extension if not exists pgcrypto;
create type public.app_role as enum ('proprietor','staff','parent','student');
create type public.invoice_status as enum ('unpaid','partial','paid','cancelled');
create type public.payment_status as enum ('pending','successful','failed','refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null,
  full_name text not null,
  phone text,
  created_at timestamptz not null default now()
);
create table public.academic_sessions (id uuid primary key default gen_random_uuid(), name text unique not null, is_active boolean not null default false);
create table public.students (
 id uuid primary key default gen_random_uuid(), user_id uuid unique references auth.users(id), admission_no text unique not null,
 full_name text not null, class_level text not null, session_id uuid references public.academic_sessions(id), active boolean not null default true, created_at timestamptz not null default now()
);
create table public.parent_students (parent_id uuid references auth.users(id) on delete cascade, student_id uuid references public.students(id) on delete cascade, relationship text, primary key(parent_id,student_id));
create table public.invoices (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id), session_id uuid references public.academic_sessions(id),
 description text not null, amount_due numeric(12,2) not null check(amount_due>=0), amount_paid numeric(12,2) not null default 0 check(amount_paid>=0), status public.invoice_status not null default 'unpaid', due_date date, created_at timestamptz not null default now()
);
create table public.payments (
 id uuid primary key default gen_random_uuid(), invoice_id uuid not null references public.invoices(id), payer_id uuid references auth.users(id),
 gateway text not null, gateway_reference text unique not null, amount numeric(12,2) not null check(amount>0), currency text not null default 'NGN', status public.payment_status not null default 'pending', verified_at timestamptz, created_at timestamptz not null default now()
);
create table public.audit_log (id bigint generated always as identity primary key, actor_id uuid references auth.users(id), action text not null, entity_type text not null, entity_id text, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now());

alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.parent_students enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.audit_log enable row level security;

create or replace function public.current_role() returns public.app_role language sql stable security definer set search_path=public as $$ select role from public.profiles where id=auth.uid() $$;
create policy "profile self or proprietor" on public.profiles for select using (id=auth.uid() or public.current_role()='proprietor');
create policy "proprietor students" on public.students for all using (public.current_role()='proprietor') with check (public.current_role()='proprietor');
create policy "student self" on public.students for select using (user_id=auth.uid());
create policy "parent linked students" on public.students for select using (exists(select 1 from public.parent_students ps where ps.student_id=students.id and ps.parent_id=auth.uid()));
create policy "parent links visible" on public.parent_students for select using (parent_id=auth.uid() or public.current_role()='proprietor');
create policy "invoice proprietor" on public.invoices for all using(public.current_role()='proprietor') with check(public.current_role()='proprietor');
create policy "invoice student" on public.invoices for select using(exists(select 1 from public.students s where s.id=invoices.student_id and s.user_id=auth.uid()));
create policy "invoice parent" on public.invoices for select using(exists(select 1 from public.parent_students ps where ps.student_id=invoices.student_id and ps.parent_id=auth.uid()));
create policy "payment proprietor" on public.payments for select using(public.current_role()='proprietor');
create policy "payment payer" on public.payments for select using(payer_id=auth.uid());
create policy "audit proprietor" on public.audit_log for select using(public.current_role()='proprietor');

-- Gateway callbacks should write payments through a trusted server/service role only.
