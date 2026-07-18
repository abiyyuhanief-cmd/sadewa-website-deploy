import { createClient } from "@supabase/supabase-js";
import type { GuimStory } from "@/lib/types";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/env";

// Publik, hanya baca konten published (RLS anon) — tidak pakai cookies, supaya
// halaman /cerita-guim tetap statis/ISR (revalidate), bukan dipaksa dynamic.
function publicClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function getGuimStorySlugs(): Promise<{ slug: string }[]> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("guim_story")
    .select("slug")
    .eq("status", "published");

  if (error) throw error;
  return data as { slug: string }[];
}

export async function getGuimStoryListing(): Promise<GuimStory[]> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("guim_story")
    .select("*")
    .eq("status", "published")
    .order("angkatan", { ascending: true });

  if (error) throw error;
  return data as GuimStory[];
}

export type GuimStoryNavItem = {
  slug: string;
  angkatan: number;
  nama_angkatan: string;
  kabupaten: string;
  provinsi: string;
};

/**
 * Angkatan tetangga (sebelum/sesudah) berdasar urutan `angkatan` menaik, untuk
 * navigasi prev/next seamless di halaman detail. Hanya konten published.
 */
export async function getGuimStoryNav(
  slug: string
): Promise<{ prev: GuimStoryNavItem | null; next: GuimStoryNavItem | null }> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("guim_story")
    .select("slug, angkatan, nama_angkatan, kabupaten, provinsi")
    .eq("status", "published")
    .order("angkatan", { ascending: true });

  if (error) throw error;
  const list = (data ?? []) as GuimStoryNavItem[];
  const i = list.findIndex((a) => a.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i < list.length - 1 ? list[i + 1] : null,
  };
}

export async function getGuimStoryBySlug(slug: string): Promise<GuimStory | null> {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("guim_story")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as GuimStory | null;
}
