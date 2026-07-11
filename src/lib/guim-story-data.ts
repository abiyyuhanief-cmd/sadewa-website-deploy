import { createClient } from "@supabase/supabase-js";
import type { GuimStory } from "@/lib/types";

// Publik, hanya baca konten published (RLS anon) — tidak pakai cookies, supaya
// halaman /cerita-guim tetap statis/ISR (revalidate), bukan dipaksa dynamic.
function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
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
