import { createClient } from "@supabase/supabase-js";
import type { GuimTestimoni, GuimTestimoniWithAngkatan } from "@/lib/types";
import { getGuimStoryListing } from "@/lib/guim-story-data";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/env";

// Publik, hanya baca testimoni published (RLS anon) — tanpa cookies, supaya
// halaman-halaman yang memakainya tetap statis/ISR.
function publicClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/**
 * Feed testimoni lintas angkatan (dicampur, bukan difilter per slug) —
 * dipakai baik di halaman detail angkatan maupun listing GUIM Story. Tiap
 * testimoni di-tag dengan nama_angkatan asalnya (join sisi aplikasi ke
 * guim_story, karena guim_slug tidak punya FK formal ke tabel itu).
 */
export async function getAllTestimoni(): Promise<GuimTestimoniWithAngkatan[]> {
  try {
    const supabase = publicClient();
    const [testimoniRes, angkatanList] = await Promise.all([
      supabase
        .from("guim_testimoni")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false }),
      getGuimStoryListing(),
    ]);

    // Jangan gagalkan render halaman kalau tabel/testimoni belum ada — cukup
    // kembalikan kosong (fitur ini tambahan, bukan konten inti angkatan).
    if (testimoniRes.error) return [];

    const namaAngkatanBySlug = new Map(angkatanList.map((a) => [a.slug, a.nama_angkatan]));
    return ((testimoniRes.data ?? []) as GuimTestimoni[]).map((t) => ({
      ...t,
      nama_angkatan: namaAngkatanBySlug.get(t.guim_slug) ?? t.guim_slug,
    }));
  } catch {
    return [];
  }
}
