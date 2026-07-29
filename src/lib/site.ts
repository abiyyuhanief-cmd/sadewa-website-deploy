import type { Metadata } from "next";

// Sumber tunggal identitas situs untuk kebutuhan SEO: canonical URL, sitemap,
// robots, dan Open Graph. Semua URL absolut dibangun dari sini supaya domain
// tidak tersebar hard-coded di banyak file.
//
// Urutan pembacaan: NEXT_PUBLIC_SITE_URL (di-inline saat build, tersedia juga
// di client) → SITE_URL (server-only, sudah dipakai email reset password) →
// domain produksi sebagai jaring pengaman.
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://www.sadewaind.org";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

// Sinkron dengan src/lib/env.ts: hanya deployment Production yang boleh
// diindeks. Preview Vercel & lokal sengaja ditutup agar tidak jadi konten
// duplikat yang bersaing dengan domain asli di hasil pencarian.
export const IS_PRODUCTION_SITE = process.env.NEXT_PUBLIC_APP_ENV === "production";

export const SITE_NAME = "Sadewa";
export const SITE_TITLE = "Sadewa — Sayap Dewantara Indonesia";
export const SITE_DESCRIPTION =
  "Sadewa (Sayap Dewantara Indonesia) memperkuat pendidikan dasar di daerah pelosok Indonesia bersama alumni Gerakan UI Mengajar. #DedikasiUntukEdukasi";
export const SITE_OG_IMAGE = "/og-default.jpg";

/** `/about` → `https://domain/about`; `/` → `https://domain` (tanpa slash ekor). */
export function absoluteUrl(path: string = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Path relatif, dipakai sebagai canonical. Contoh: "/cerita". */
  path: string;
  /** URL gambar (absolut atau relatif ke public/). Default: OG bawaan situs. */
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
};

/**
 * Metadata satu halaman: title, description, canonical, Open Graph, Twitter.
 *
 * Dipakai di setiap page karena Next me-*replace* objek `openGraph` per segment
 * (bukan merge dalam), jadi halaman yang menulis openGraph sendiri harus
 * menuliskan field-nya lengkap. Helper ini menjaga semuanya konsisten.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image || SITE_OG_IMAGE;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: SITE_TITLE,
      locale: "id_ID",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article"
        ? {
            publishedTime: publishedTime ?? undefined,
            modifiedTime: modifiedTime ?? undefined,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
