import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { getCeritaListing } from "@/lib/cerita-data";
import Reveal from "@/components/reveal";
import CeritaComingSoon from "@/components/cerita-coming-soon";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cerita — Sadewa",
  description: "Cerita Kita - Sadewa & GUIM.",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default async function CeritaPage() {
  const articles = await getCeritaListing();

  return (
    <section className="bg-paper-50">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-600">
          <Newspaper className="h-4 w-4" aria-hidden strokeWidth={2} />
          Cerita
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
          Cerita Kita
        </h1>

        {articles.length === 0 ? (
          <CeritaComingSoon />
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((b, i) => (
              <Reveal key={b.id} delay={(i % 3) * 0.08}>
              <Link
                href={`/cerita/${b.slug}`}
                className="group block overflow-hidden rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-paper-100">
                  {b.gambar_utama_url && (
                    <Image src={b.gambar_utama_url} alt={b.judul} fill className="object-cover" />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-ink-600">{formatDate(b.published_at)}</p>
                  <h2 className="mt-1.5 font-display text-lg font-semibold text-ink-900 group-hover:text-teal-700">
                    {b.judul}
                  </h2>
                  {b.ringkasan && (
                    <p className="mt-2 line-clamp-2 text-sm text-ink-600">{b.ringkasan}</p>
                  )}
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
