-- Sadewa Website — testimoni alumni per angkatan GUIM (engagement alumni).
-- Alumni mengirim kenangan/testimoni dari halaman detail angkatan; submission
-- masuk sebagai 'pending' dan baru tampil publik setelah admin meng-approve
-- (status 'published') — pola moderasi yang sama seperti tabel cerita.

create table if not exists public.guim_testimoni (
  id uuid primary key default gen_random_uuid(),
  guim_slug text not null,
  nama text not null,
  peran text,
  pesan text not null,
  status text not null default 'pending' check (status in ('pending', 'published')),
  created_at timestamptz not null default now()
);

-- Query publik: ambil testimoni published per slug, terbaru dulu.
create index if not exists guim_testimoni_slug_status_idx
  on public.guim_testimoni (guim_slug, status, created_at desc);

alter table public.guim_testimoni enable row level security;

-- Publik boleh INSERT, tapi hanya sebagai 'pending' (moderasi wajib).
-- Batasi panjang agar tak jadi vektor spam berukuran besar.
create policy "guim_testimoni_public_insert"
  on public.guim_testimoni
  for insert
  to anon
  with check (
    status = 'pending'
    and char_length(guim_slug) > 0 and char_length(guim_slug) <= 120
    and char_length(nama) > 0 and char_length(nama) <= 80
    and char_length(pesan) > 0 and char_length(pesan) <= 1000
    and (peran is null or char_length(peran) <= 80)
  );

-- Publik hanya boleh membaca yang sudah published.
create policy "guim_testimoni_public_select"
  on public.guim_testimoni
  for select
  to anon
  using (status = 'published');

-- Admin (authenticated) — moderasi penuh (lihat pending, approve, hapus).
create policy "guim_testimoni_admin_all"
  on public.guim_testimoni
  for all
  to authenticated
  using (true)
  with check (true);
