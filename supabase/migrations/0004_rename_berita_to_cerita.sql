-- Rename "berita" content type to "cerita" (wording change, same schema)

alter table public.berita rename to cerita;

alter index berita_status_published_at_idx rename to cerita_status_published_at_idx;

alter trigger berita_set_updated_at on public.cerita rename to cerita_set_updated_at;

alter policy "berita_public_select_published" on public.cerita rename to "cerita_public_select_published";
alter policy "berita_admin_all" on public.cerita rename to "cerita_admin_all";
