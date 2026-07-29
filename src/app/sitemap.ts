import type { MetadataRoute } from "next";
import { getCeritaListing } from "@/lib/cerita-data";
import { getGuimStoryListing } from "@/lib/guim-story-data";
import { absoluteUrl } from "@/lib/site";

// Sitemap ikut irama ISR halaman konten: dibangun ulang paling cepat tiap jam,
// jadi artikel/angkatan baru yang dipublish dari admin otomatis masuk daftar
// tanpa perlu redeploy.
export const revalidate = 3600;

const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.8 },
  { path: "/cerita-guim", changeFrequency: "monthly", priority: 0.9 },
  { path: "/cerita", changeFrequency: "weekly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Kalau Supabase sedang bermasalah, sitemap tetap terbit berisi halaman
  // statis — lebih baik daripada build/route gagal total.
  const [cerita, guim] = await Promise.all([
    getCeritaListing().catch(() => []),
    getGuimStoryListing().catch(() => []),
  ]);

  const lastContentUpdate = [...cerita, ...guim]
    .map((row) => row.updated_at)
    .sort()
    .at(-1);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: lastContentUpdate ? new Date(lastContentUpdate) : new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const guimEntries: MetadataRoute.Sitemap = guim.map((angkatan) => ({
    url: absoluteUrl(`/cerita-guim/${angkatan.slug}`),
    lastModified: new Date(angkatan.updated_at),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const ceritaEntries: MetadataRoute.Sitemap = cerita.map((artikel) => ({
    url: absoluteUrl(`/cerita/${artikel.slug}`),
    lastModified: new Date(artikel.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
    ...(artikel.gambar_utama_url ? { images: [artikel.gambar_utama_url] } : {}),
  }));

  // /admin sengaja tidak dimasukkan: halaman privat, sudah noindex juga.
  return [...staticEntries, ...guimEntries, ...ceritaEntries];
}
