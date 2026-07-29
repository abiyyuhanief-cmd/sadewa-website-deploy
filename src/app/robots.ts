import type { MetadataRoute } from "next";
import { absoluteUrl, IS_PRODUCTION_SITE, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview Vercel & lokal: tutup total. Tanpa ini, URL preview bisa terindeks
  // dan bersaing sebagai konten duplikat dengan domain asli.
  if (!IS_PRODUCTION_SITE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Prefix match: menutup /admin dan seluruh turunannya.
        disallow: ["/admin"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
