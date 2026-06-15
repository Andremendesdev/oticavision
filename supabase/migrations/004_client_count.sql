-- Quantidade de clientes por registro de ganho (ex: R$ 400,00 · 15 clientes)

alter table public.earnings
  add column if not exists client_count int not null default 1 check (client_count >= 1);
