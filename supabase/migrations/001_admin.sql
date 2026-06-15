-- Painel admin — rode no SQL Editor do Supabase

create table if not exists public.earnings (
  id uuid primary key default gen_random_uuid(),
  amount numeric(10, 2) not null check (amount > 0),
  category text not null check (
    category in ('corte', 'barba', 'combo', 'produto', 'gorjeta', 'outro')
  ),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists earnings_created_at_idx on public.earnings (created_at desc);

create table if not exists public.admin_settings (
  id int primary key default 1 check (id = 1),
  monthly_goal numeric(10, 2) not null default 8000
);

insert into public.admin_settings (id, monthly_goal)
values (1, 8000)
on conflict (id) do nothing;

alter table public.earnings enable row level security;
alter table public.admin_settings enable row level security;

create policy "earnings_public_all"
  on public.earnings
  for all
  using (true)
  with check (true);

create policy "admin_settings_public_all"
  on public.admin_settings
  for all
  using (true)
  with check (true);
