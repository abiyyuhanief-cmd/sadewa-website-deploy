-- Sadewa Website — izinkan admin (authenticated) membaca tabel leads di panel admin.
-- Sebelumnya hanya anon INSERT yang diizinkan (0001_leads.sql); tidak ada cara melihat submission.

create policy "leads_admin_select"
  on public.leads
  for select
  to authenticated
  using (true);
