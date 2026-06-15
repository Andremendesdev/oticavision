-- Despesas — rode após 001_admin.sql e 002_auth_rls.sql

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  amount numeric(10, 2) not null check (amount > 0),
  category text not null check (
    category in ('aluguel', 'produtos', 'energia', 'salario', 'manutencao', 'marketing', 'outro')
  ),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists expenses_created_at_idx on public.expenses (created_at desc);

alter table public.expenses enable row level security;

create policy "expenses_authenticated_all"
  on public.expenses
  for all
  to authenticated
  using (true)
  with check (true);
