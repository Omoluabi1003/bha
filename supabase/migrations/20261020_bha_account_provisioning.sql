alter table public.profiles add column if not exists student_id text unique;
alter table public.profiles add column if not exists school_class text;
alter table public.profiles add column if not exists is_active boolean not null default true;
alter table public.profiles add column if not exists must_change_password boolean not null default false;
alter table public.profiles add column if not exists created_by uuid references public.profiles(id) on delete set null;
create index if not exists profiles_role_active_idx on public.profiles(role,is_active);
create index if not exists profiles_student_id_idx on public.profiles(student_id) where student_id is not null;
