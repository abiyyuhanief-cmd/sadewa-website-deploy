import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBeritaListing } from "@/lib/berita-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Berita — Sadewa",
  description: "Kabar terkini kegiatan Sayap Dewantara Indonesia (Sadewa).",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BeritaPage() {
  const articles = await getBeritaListing();

  return (
    <section className="bg-paper-50">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Berita</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900 sm:text-5xl">
          Kabar Terkini Sadewa
        </h1>

        {articles.length === 0 ? (
          <p className="mt-10 text-ink-600">Belum ada berita yang diterbitkan.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((b) => (
              <Link
                key={b.id}
                href={`/berita/${b.slug}`}
                className="group overflow-hidden rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-paper-100">
                  {b.gambar_utama_url && (
                    <Image src={b.gambar_utama_url} alt={b.judul} fill className="object-cover" />
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-ink-500">{formatDate(b.published_at)}</p>
                  <h2 className="mt-1.5 font-display text-lg font-semibold text-ink-900 group-hover:text-teal-700">
                    {b.judul}
                  </h2>
                  {b.ringkasan && (
                    <p className="mt-2 line-clamp-2 text-sm text-ink-600">{b.ringkasan}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
