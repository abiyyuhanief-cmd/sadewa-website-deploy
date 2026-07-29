-- Sadewa Website — analytics ringan, self-hosted (tanpa tracker pihak ketiga).
--
-- Satu baris per page view, dikirim dari <AnalyticsTracker /> ke /api/track.
-- Privasi: tidak ada cookie/localStorage dan tidak ada IP mentah yang disimpan.
-- Identitas pengunjung hanya berupa hash harian sha256(salt + tanggal + ip + UA)
-- yang dibuat di server, sehingga hash tidak bisa dibalik jadi IP dan pengunjung
-- yang sama tidak bisa dihubungkan antar hari.
--
-- Konsekuensinya "pengunjung unik" dihitung per hari (window > 1 hari = jumlah
-- hash berbeda, jadi orang yang datang 3 hari berturut-turut terhitung 3).
-- Trade-off yang disengaja demi tidak menyimpan identitas persisten.

create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  visitor_hash text not null,
  path text not null,
  -- Hostname perujuk tanpa "www." (mis. "google.com"); null = kunjungan langsung.
  referrer_host text,
  utm_source text,
  device text not null default 'desktop' check (device in ('mobile', 'tablet', 'desktop')),
  created_at timestamptz not null default now()
);

-- Semua query dashboard difilter rentang waktu.
create index if not exists page_views_created_at_idx
  on public.page_views (created_at desc);

-- Perhitungan sesi memindai view per pengunjung secara terurut (lihat analytics_summary).
create index if not exists page_views_visitor_idx
  on public.page_views (visitor_hash, created_at);

alter table public.page_views enable row level security;

-- INSERT hanya lewat /api/track memakai service role (bypass RLS), jadi anon
-- sengaja tidak diberi policy apa pun — publik tidak bisa menulis maupun membaca.
create policy "page_views_admin_select"
  on public.page_views
  for select
  to authenticated
  using (true);

-- Ringkasan siap-pakai untuk /admin/analytics: satu RPC, satu round-trip.
-- security invoker (default) — RLS di atas tetap berlaku, anon dapat hasil kosong.
-- Hari dipotong di zona Asia/Jakarta supaya "hari ini" sesuai jam pengurus.
create or replace function public.analytics_summary(p_days int default 7)
returns jsonb
language sql
stable
as $$
  with win as (
    select
      d as days,
      ((now() at time zone 'Asia/Jakarta')::date - (d - 1)) as start_day,
      (now() at time zone 'Asia/Jakarta')::date as end_day
    from (select least(greatest(coalesce(p_days, 7), 1), 90) as d) x
  ),
  views as (
    select
      v.id,
      v.visitor_hash,
      v.path,
      v.referrer_host,
      v.utm_source,
      v.device,
      v.created_at,
      (v.created_at at time zone 'Asia/Jakarta')::date as day
    from public.page_views v, win w
    where v.created_at >= (w.start_day::timestamp at time zone 'Asia/Jakarta')
  ),
  -- Sesi = rentetan view satu pengunjung; jeda > 30 menit dianggap sesi baru.
  session_starts as (
    select 1 as marker
    from (
      select created_at - lag(created_at) over (partition by visitor_hash order by created_at) as gap
      from views
    ) g
    where g.gap is null or g.gap > interval '30 minutes'
  ),
  totals as (
    select
      (select count(*) from views) as views,
      (select count(distinct visitor_hash) from views) as visitors,
      (select count(*) from session_starts) as sessions
  ),
  day_series as (
    -- Cast eksplisit ke timestamp: memilih overload generate_series yang tidak
    -- bergantung pada TimeZone sesi, jadi tanggalnya persis seperti win.
    select generate_series(w.start_day::timestamp, w.end_day::timestamp, interval '1 day')::date as day
    from win w
  ),
  by_day as (
    select
      s.day,
      count(v.id) as views,
      count(distinct v.visitor_hash) as visitors
    from day_series s
    left join views v on v.day = s.day
    group by s.day
  ),
  top_pages as (
    select path, count(*) as views, count(distinct visitor_hash) as visitors
    from views
    group by path
    order by count(*) desc, path
    limit 10
  ),
  sources as (
    select
      coalesce(nullif(utm_source, ''), nullif(referrer_host, ''), 'direct') as source,
      count(*) as views,
      count(distinct visitor_hash) as visitors
    from views
    group by 1
    order by count(*) desc, 1
    limit 8
  ),
  devices as (
    select device, count(*) as views, count(distinct visitor_hash) as visitors
    from views
    group by device
  )
  select jsonb_build_object(
    'days', (select days from win),
    'totals', (select to_jsonb(t) from totals t),
    'by_day', (select coalesce(jsonb_agg(to_jsonb(d) order by d.day), '[]'::jsonb) from by_day d),
    'top_pages', (select coalesce(jsonb_agg(to_jsonb(p) order by p.views desc), '[]'::jsonb) from top_pages p),
    'sources', (select coalesce(jsonb_agg(to_jsonb(s) order by s.views desc), '[]'::jsonb) from sources s),
    'devices', (select coalesce(jsonb_agg(to_jsonb(dv) order by dv.views desc), '[]'::jsonb) from devices dv)
  );
$$;

revoke all on function public.analytics_summary(int) from public, anon;
grant execute on function public.analytics_summary(int) to authenticated;

-- Retensi: tabel ini tumbuh terus. Kalau nanti perlu dipangkas, jalankan manual
-- (atau lewat pg_cron) — dashboard paling jauh hanya melihat 90 hari:
--   delete from public.page_views where created_at < now() - interval '180 days';
