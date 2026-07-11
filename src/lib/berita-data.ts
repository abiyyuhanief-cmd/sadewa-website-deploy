import { createClient } from "@supabase/supabase-js";
import type { Berita } from "@/lib/types";

// Publik, hanya baca konten published (RLS anon) — tidak pakai cookies, supaya
// halaman /berita tetap statis/ISR (revalidate), bukan dipaksa dynamic.
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
}

export async function getBeritaSlugs(): Promise<{ slug: string }[]> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("berita")
    .select("slug")
    .eq("status", "published");

  if (error) throw error;
  return data as { slug: string }[];
}

export async function getBeritaListing(): Promise<Berita[]> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data as Berita[];
}

export async function getBeritaBySlug(slug: string): Promise<Berita | null> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as Berita | null;
}
