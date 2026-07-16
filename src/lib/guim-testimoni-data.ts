import { createClient } from "@supabase/supabase-js";
import type { GuimTestimoni } from "@/lib/types";

// Publik, hanya baca testimoni published (RLS anon) — tanpa cookies, supaya
// halaman detail /cerita-guim/[slug] tetap statis/ISR.
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
}

export async function getTestimoniBySlug(slug: string): Promise<GuimTestimoni[]> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("guim_testimoni")
    .select("*")
    .eq("guim_slug", slug)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  // Jangan gagalkan render halaman kalau tabel/testimoni belum ada — cukup
  // kembalikan kosong (fitur ini tambahan, bukan konten inti angkatan).
  if (error) return [];
  return (data ?? []) as GuimTestimoni[];
}
