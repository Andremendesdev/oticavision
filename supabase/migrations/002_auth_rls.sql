-- RLS autenticado — rode após 001_admin.sql

drop policy if exists "earnings_public_all" on public.earnings;
drop policy if exists "admin_settings_public_all" on public.admin_settings;

create policy "earnings_authenticated_all"
  on public.earnings
  for all
  to authenticated
  using (true)
  with check (true);

create policy "admin_settings_authenticated_all"
  on public.admin_settings
  for all
  to authenticated
  using (true)
  with check (true);
