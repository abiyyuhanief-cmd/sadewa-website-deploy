import { createClient } from "@supabase/supabase-js";
import type { Cerita } from "@/lib/types";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/env";

// Publik, hanya baca konten published (RLS anon) — tidak pakai cookies, supaya
// halaman /cerita tetap statis/ISR (revalidate), bukan dipaksa dynamic.
function publicClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function getCeritaSlugs(): Promise<{ slug: string }[]> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("cerita")
    .select("slug")
    .eq("status", "published");

  if (error) throw error;
  return data as { slug: string }[];
}

export async function getCeritaListing(): Promise<Cerita[]> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("cerita")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data as Cerita[];
}

export async function getCeritaBySlug(slug: string): Promise<Cerita | null> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("cerita")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as Cerita | null;
}
