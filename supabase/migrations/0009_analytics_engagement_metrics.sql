-- Sadewa Website — perluas analytics_summary (0008) dengan metrik engagement:
-- rata-rata durasi kunjungan, bounce rate, dan halaman keluar (exit pages).
--
-- Durasi kunjungan dihitung dari selisih view pertama–terakhir dalam satu sesi
-- (bukan dari event "leave" — kita tidak punya itu tanpa JS tambahan di client).
-- Konsekuensinya: sesi satu halaman selalu berdurasi 0 detik, ikut menarik
-- rata-rata ke bawah. Ini trade-off standar di tool analytics ringan sejenis
-- (Plausible/Fathom pakai pendekatan yang sama), bukan bug.

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
  -- Beri nomor sesi per pengunjung: jeda > 30 menit dari view sebelumnya = sesi baru.
  session_marks as (
    select
      v.*,
      case
        when lag(created_at) over (partition by visitor_hash order by created_at) is null
          or v.created_at - lag(created_at) over (partition by visitor_hash order by created_at) > interval '30 minutes'
        then 1
        else 0
      end as is_new_session
    from views v
  ),
  session_ids as (
    select
      *,
      sum(is_new_session) over (partition by visitor_hash order by created_at) as session_no
    from session_marks
  ),
  sessions as (
    select
      visitor_hash,
      session_no,
      min(created_at) as started_at,
      max(created_at) as ended_at,
      count(*) as views_in_session
    from session_ids
    group by visitor_hash, session_no
  ),
  -- Baris terakhir tiap sesi = halaman tempat pengunjung berhenti (exit page).
  exit_marks as (
    select distinct on (visitor_hash, session_no)
      visitor_hash, session_no, path as exit_path
    from session_ids
    order by visitor_hash, session_no, created_at desc
  ),
  totals as (
    select
      (select count(*) from views) as views,
      (select count(distinct visitor_hash) from views) as visitors,
      (select count(*) from sessions) as sessions,
      (select coalesce(avg(extract(epoch from (ended_at - started_at)))::int, 0) from sessions) as avg_duration_seconds,
      (
        select case when count(*) = 0 then 0
          else round(count(*) filter (where views_in_session = 1)::numeric / count(*), 3)
        end
        from sessions
      ) as bounce_rate
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
  ),
  -- Views per halaman tanpa limit — dipakai sebagai penyebut exit_rate, jadi
  -- halaman yang sering jadi titik keluar tapi bukan top-10 tetap dapat rate akurat.
  page_totals as (
    select path, count(*) as views
    from views
    group by path
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
