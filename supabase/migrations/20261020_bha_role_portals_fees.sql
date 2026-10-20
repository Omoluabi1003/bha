-- BHA Digital Campus: role portals and school-fee ledger
-- Payment records are server/provider verified. Clients never mark payments successful.

alter type public.bha_role add value if not exists 'proprietor';

create table if not exists public.fee_invoices (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.profiles(id) on delete cascade,
 title text not null,
 term text,
 academic_session text,
 amount_due numeric(12,2) not null check(amount_due>=0),
 amount_paid numeric(12,2) not null default 0 check(amount_paid>=0),
 due_date date,
 status text not null default 'unpaid' check(status in ('unpaid','part_paid','paid','waived')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.fee_payments (
 id uuid primary key default gen_random_uuid(),
 invoice_id uuid not null references public.fee_invoices(id) on delete restrict,
 student_id uuid not null references public.profiles(id) on delete restrict,
 payer_id uuid references public.profiles(id) on delete set null,
 amount numeric(12,2) not null check(amount>0),
 provider text,
 provider_reference text unique,
 status text not null default 'pending' check(status in ('pending','successful','failed','refunded')),
 paid_at timestamptz,
 created_at timestamptz not null default now()
);

alter table public.fee_invoices enable row level security;
alter table public.fee_payments enable row level security;

create policy "student_invoice_read" on public.fee_invoices for select to authenticated using(student_id=auth.uid());
create policy "parent_invoice_read" on public.fee_invoices for select to authenticated using(exists(select 1 from public.parent_students ps where ps.parent_id=auth.uid() and ps.student_id=fee_invoices.student_id));
create policy "finance_invoice_manage" on public.fee_invoices for all to authenticated using(public.my_role() in ('admin','proprietor')) with check(public.my_role() in ('admin','proprietor'));
create policy "student_payment_read" on public.fee_payments for select to authenticated using(student_id=auth.uid());
create policy "parent_payment_read" on public.fee_payments for select to authenticated using(payer_id=auth.uid() or exists(select 1 from public.parent_students ps where ps.parent_id=auth.uid() and ps.student_id=fee_payments.student_id));
create policy "finance_payment_read" on public.fee_payments for select to authenticated using(public.my_role() in ('admin','proprietor'));

create index if not exists fee_invoices_student_idx on public.fee_invoices(student_id,status);
create index if not exists fee_payments_invoice_idx on public.fee_payments(invoice_id,status);
