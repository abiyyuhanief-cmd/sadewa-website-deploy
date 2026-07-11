-- Sadewa Website Fase 2 — Cerita GUIM, Berita, Admin CMS (PRD-SADEWA-v2.0)
-- FR-105/106/107/109/110/111/112

create table if not exists public.guim_story (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  angkatan int not null unique,
  nama_angkatan text not null,
  kabupaten text not null,
  provinsi text not null,
  tahun_pelaksanaan text not null,
  tema text not null,
  tagline text,
  nilai text[],
  gambaran_umum text not null,
  latar_belakang text,
  timeline_pra_aksi text[],
  timeline_aksi text[],
  timeline_pasca_aksi text[],
  titik_pelaksanaan jsonb not null default '[]'::jsonb,
  inovasi text[],
  pembaharuan text[],
  evaluasi_lesson_learned text[],
  jumlah_panitia int,
  jumlah_pengajar int,
  jumlah_siswa int,
  jumlah_guru int,
  jumlah_sd int,
  jumlah_desa int,
  jumlah_kecamatan int,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.berita (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  judul text not null,
  ringkasan text,
  konten text not null,
  gambar_utama_url text,
  penulis text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists berita_status_published_at_idx
  on public.berita (status, published_at desc);

-- updated_at auto-touch
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists guim_story_set_updated_at on public.guim_story;
create trigger guim_story_set_updated_at
  before update on public.guim_story
  for each row execute function public.set_updated_at();

drop trigger if exists berita_set_updated_at on public.berita;
create trigger berita_set_updated_at
  before update on public.berita
  for each row execute function public.set_updated_at();

-- RLS (FR-112): publik hanya SELECT baris published; authenticated (admin) full CRUD
alter table public.guim_story enable row level security;
alter table public.berita enable row level security;

create policy "guim_story_public_select_published"
  on public.guim_story
  for select
  to anon
  using (status = 'published');

create policy "guim_story_admin_all"
  on public.guim_story
  for all
  to authenticated
  using (true)
  with check (true);

create policy "berita_public_select_published"
  on public.berita
  for select
  to anon
  using (status = 'published');

create policy "berita_admin_all"
  on public.berita
  for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket untuk gambar (FR-111)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_public_read"
  on storage.objects
  for select
  to public
  using (bucket_id = 'media');

create policy "media_admin_write"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "media_admin_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'media');

create policy "media_admin_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'media');
