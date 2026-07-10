-- Sadewa Website — tabel leads (FR-008, FR-010, FR-011)
-- Menyimpan submission form "Daftar Minat" dari Home & About.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  interest text,
  consent boolean not null default false,
  source_page text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Publik hanya boleh INSERT (FR-011). Tidak ada policy SELECT/UPDATE/DELETE untuk anon,
-- sehingga default-deny berlaku untuk operasi lain.
create policy "leads_public_insert"
  on public.leads
  for insert
  to anon
  with check (
    char_length(name) > 0
    and email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    and consent = true
  );

-- Disiapkan untuk peran admin di fase berikutnya (§12 ID-003 pada PRD) — belum diaktifkan.
-- create policy "leads_admin_select" on public.leads for select to authenticated using (...);
