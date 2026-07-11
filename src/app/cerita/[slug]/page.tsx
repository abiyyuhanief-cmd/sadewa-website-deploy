import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCeritaBySlug, getCeritaSlugs } from "@/lib/cerita-data";

export const revalidate = 60;

export async function generateStaticParams() {
  return getCeritaSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = await getCeritaBySlug(slug);
  if (!b) return {};
  return {
    title: `${b.judul} — Cerita — Sadewa`,
    description: b.ringkasan ?? undefined,
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default async function CeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = await getCeritaBySlug(slug);
  if (!b) notFound();

  return (
    <article className="bg-paper-50">
      <div className="mx-auto max-w-3xl px-6 py-14 sm:py-18">
        <Link href="/cerita" className="text-xs font-semibold text-teal-700 hover:text-teal-800">
          ← Semua Cerita
        </Link>
        <p className="mt-5 text-sm text-ink-500">
          {formatDate(b.published_at)}
          {b.penulis ? ` · ${b.penulis}` : ""}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
          {b.judul}
        </h1>

        {b.gambar_utama_url && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[4px_24px_4px_24px]">
            <Image src={b.gambar_utama_url} alt={b.judul} fill className="object-cover" priority />
          </div>
        )}

        <div
          className="mt-10 max-w-none text-base leading-relaxed text-ink-800 [&_a]:text-teal-700 [&_a]:underline [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink-900 [&_img]:rounded-[4px_20px_4px_20px] [&_li]:ml-5 [&_ol]:mt-3 [&_ol]:list-decimal [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: b.konten }}
        />
      </div>
    </article>
  );
}
