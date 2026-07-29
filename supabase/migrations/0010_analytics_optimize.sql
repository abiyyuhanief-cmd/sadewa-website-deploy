-- Sadewa Website — optimasi analytics_summary (0009) + fungsi retensi.
--
-- Tidak ada perubahan perilaku dashboard; yang berubah hanya jumlah kerja yang
-- dilakukan Postgres per pemanggilan:
--
-- 1. GROUP BY path sebelumnya dihitung DUA KALI (top_pages dan page_totals untuk
--    penyebut exit_rate). Sekarang dihitung sekali di page_totals lalu dipakai
--    ulang — CTE yang direferensi >1 kali otomatis dimaterialisasi Postgres.
-- 2. count(distinct visitor_hash) pada top_pages, sources, dan devices dibuang:
--    ketiganya tidak pernah ditampilkan di UI, jadi murni kerja terbuang.
--    (by_day tetap punya visitors — dipakai di tooltip grafik.)
-- 3. Metrik sesi (jumlah, durasi, bounce) tadinya 3 subquery terpisah atas CTE
--    sessions; sekarang satu agregasi sekali jalan.
-- 4. by_day tidak lagi mem-LEFT JOIN seluruh baris mentah ke deret tanggal —
--    diagregasi dulu per hari, baru dijoin (baris yang dijoin jauh lebih sedikit).
-- 5. CTE hanya membawa kolom yang benar-benar dipakai, sehingga tabel sementara
--    yang dimaterialisasi lebih kecil.
--
-- Index sengaja TIDAK diubah. page_views_visitor_idx (visitor_hash, created_at)
-- tetap dipertahankan karena berpotensi dipakai planner untuk menyediakan urutan
-- window function penghitung sesi; membuangnya berisiko memaksa sort tambahan.

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
  -- Tandai awal sesi: jeda > 30 menit dari view sebelumnya milik pengunjung yang
  -- sama. WINDOW bernama supaya lag() dihitung sekali, bukan dua kali.
  session_bounds as (
    select
      visitor_hash,
      path,
      created_at,
      case
        when lag(created_at) over w is null
          or created_at - lag(created_at) over w > interval '30 minutes'
        then 1 else 0
      end as is_new_session
    from views
    window w as (partition by visitor_hash order by created_at)
  ),
  session_ids as (
    select
      visitor_hash,
      path,
      created_at,
      sum(is_new_session) over (partition by visitor_hash order by created_at) as session_no
    from session_bounds
  ),
  sessions as (
    select
      min(created_at) as started_at,
      max(created_at) as ended_at,
      count(*) as views_in_session
    from session_ids
    group by visitor_hash, session_no
  ),
  -- Baris terakhir tiap sesi = halaman tempat pengunjung berhenti (exit page).
  exit_marks as (
    select distinct on (visitor_hash, session_no) path as exit_path
    from session_ids
    order by visitor_hash, session_no, created_at desc
  ),
  totals as (
    select
      (select count(*) from views) as views,
      (select count(distinct visitor_hash) from views) as visitors,
      count(*) as sessions,
      coalesce(avg(extract(epoch from (ended_at - started_at)))::int, 0) as avg_duration_seconds,
      case
        when count(*) = 0 then 0
        else round(count(*) filter (where views_in_session = 1)::numeric / count(*), 3)
      end as bounce_rate
    from sessions
  ),
  views_by_day as (
    select day, count(*) as views, count(distinct visitor_hash) as visitors
    from views
    group by day
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
      coalesce(v.views, 0) as views,
      coalesce(v.visitors, 0) as visitors
    from day_series s
    left join views_by_day v on v.day = s.day
  ),
  -- Dipakai dua kali: daftar halaman terpopuler dan penyebut exit_rate.
  page_totals as (
    select path, count(*) as views
    from views
    group by path
  ),
  top_pages as (
    select path, views
    from page_totals
    order by views desc, path
    limit 10
  ),
  sources as (
    select
      coalesce(nullif(utm_source, ''), nullif(referrer_host, ''), 'direct') as source,
      count(*) as views
    from views
    group by 1
    order by 2 desc, 1
    limit 8
  ),
  devices as (
    select device, count(*) as views
    from views
    group by device
  ),
  exit_pages as (
    select
      e.exit_path as path,
      count(*) as exits,
      p.views,
      round(count(*)::numeric / nullif(p.views, 0), 3) as exit_rate
    from exit_marks e
    join page_totals p on p.path = e.exit_path
    group by e.exit_path, p.views
    order by count(*) desc
    limit 10
  )
  select jsonb_build_object(
    'days', (select days from win),
    'totals', (select to_jsonb(t) from totals t),
    'by_day', (select coalesce(jsonb_agg(to_jsonb(d) order by d.day), '[]'::jsonb) from by_day d),
    'top_pages', (select coalesce(jsonb_agg(to_jsonb(p) order by p.views desc), '[]'::jsonb) from top_pages p),
    'sources', (select coalesce(jsonb_agg(to_jsonb(s) order by s.views desc), '[]'::jsonb) from sources s),
    'devices', (select coalesce(jsonb_agg(to_jsonb(dv) order by dv.views desc), '[]'::jsonb) from devices dv),
    'exit_pages', (select coalesce(jsonb_agg(to_jsonb(e) order by e.exits desc), '[]'::jsonb) from exit_pages e)
  );
$$;

revoke all on function public.analytics_summary(int) from public, anon;
grant execute on function public.analytics_summary(int) to authenticated;

-- Retensi: page_views tumbuh satu baris per tampilan halaman dan tidak pernah
-- menyusut sendiri. Dashboard paling jauh hanya melihat 90 hari, jadi data lama
-- murni menambah ukuran tabel, index, dan backup.
--
-- security definer karena authenticated hanya punya policy SELECT (0008).
-- Batas bawah 90 hari mencegah rentang yang masih dipakai dashboard ikut terhapus.
--
-- Jalankan sesekali dari SQL Editor Supabase:  select public.analytics_prune();
-- Kalau mau otomatis, jadwalkan lewat pg_cron dari dashboard Supabase.
create or replace function public.analytics_prune(p_keep_days int default 180)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  keep_days int := greatest(coalesce(p_keep_days, 180), 90);
  deleted bigint;
begin
  delete from public.page_views
  where created_at < now() - make_interval(days => keep_days);

  get diagnostics deleted = row_count;
  return deleted;
end;
$$;

revoke all on function public.analytics_prune(int) from public, anon;
grant execute on function public.analytics_prune(int) to authenticated;
