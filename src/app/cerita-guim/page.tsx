import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Presentation, School, MapPin, MessageCircleHeart } from "lucide-react";
import { getGuimStoryListing } from "@/lib/guim-story-data";
import { getAllTestimoni } from "@/lib/guim-testimoni-data";
import { guimCumulativeStats } from "@/lib/guim-stats";
import GuimDataChart from "@/components/guim-data-chart";
import GuimJalur from "@/components/guim-jalur";
import GuimMap from "@/components/guim-map";
import GuimTestimoni from "@/components/guim-testimoni";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { absoluteUrl, buildMetadata, SITE_URL } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "GUIM Story",
  description:
    "Rekam jejak 10 angkatan Gerakan UI Mengajar (GUIM) — dari Garut hingga Pesisir Barat, satu dekade intervensi pendidikan dasar di pelosok Indonesia.",
  path: "/cerita-guim",
  image: absoluteUrl("/gallery/guim-story-hero.jpg"),
});

export default async function CeritaGuimPage() {
  const angkatanList = await getGuimStoryListing();
  const testimoni = await getAllTestimoni();

  // Daftar angkatan sebagai ItemList: membantu mesin pencari mengenali halaman
  // ini sebagai indeks, dan membuka peluang sitelinks ke tiap angkatan.
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Angkatan Gerakan UI Mengajar",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: angkatanList.length,
    itemListElement: angkatanList.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${a.nama_angkatan} — ${a.kabupaten}, ${a.provinsi}`,
      url: absoluteUrl(`/cerita-guim/${a.slug}`),
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "GUIM Story",
        item: absoluteUrl("/cerita-guim"),
      },
    ],
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="relative overflow-hidden bg-ink-900 text-paper-50">
        <Image
          src="/gallery/guim-story-hero.jpg"
          alt=""
          fill
          aria-hidden
          className="pointer-events-none absolute inset-0 object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-900/75 to-ink-900" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">GUIM Story</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Satu Dekade
            <br />Gerakan UI Mengajar
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-200">
            Sepuluh angkatan pertama, satu misi: memotivasi siswa didik sekolah dasar di daerah pelosok
            agar menjadi lebih unggul dan menginspirasi Indonesia. Gerakan ini terus berlanjut — kini
            memasuki angkatan ke-16 — dan GUIM Story akan terus diperbarui seiring perjalanan setiap
            angkatan baru.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: GraduationCap, value: guimCumulativeStats.siswa.toLocaleString("id-ID") + "+", label: "Siswa unik" },
              { icon: Presentation, value: guimCumulativeStats.guru.toLocaleString("id-ID") + "+", label: "Guru unik" },
              { icon: School, value: guimCumulativeStats.sd, label: "Sekolah dasar" },
              { icon: MapPin, value: guimCumulativeStats.provinsi, label: "Provinsi" },
            ].map((s) => (
              <div key={s.label} className="rounded-[4px_20px_4px_20px] bg-white/5 p-5">
                <s.icon className="h-5 w-5 text-teal-300" aria-hidden strokeWidth={2} />
                <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-teal-300 sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-ink-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-50">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Peta Sebaran</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Titik Aksi per Kabupaten
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-600">
            Sepuluh kabupaten yang sudah didokumentasikan lengkap di GUIM Story, plus lima kabupaten dari
            angkatan yang lebih baru dan belum punya cerita lengkap di sini.
          </p>
          <Reveal delay={0.05} className="mt-6 rounded-[4px_24px_4px_24px] bg-paper-white p-4 shadow-xl sm:p-6">
            <GuimMap />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-900">
        <Image
          src="/gallery/kelas-peta.jpg"
          alt=""
          fill
          aria-hidden
          className="pointer-events-none absolute inset-0 object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/75 via-ink-900/85 to-ink-900" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-300">10 Angkatan</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-paper-50 sm:text-4xl">
            Pilih Angkatan untuk Cerita Lengkap
          </h2>
          <GuimJalur angkatanList={angkatanList} />
        </div>
      </section>

      {testimoni.length > 0 && (
        <section className="bg-paper-50">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Cerita Alumni</p>
            <h2 className="mt-2 flex items-center gap-2.5 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
              <MessageCircleHeart className="h-7 w-7 shrink-0 text-teal-600" aria-hidden strokeWidth={2} />
              Suara Alumni
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-ink-600">
              Kenangan lintas angkatan GUIM. Alumni salah satu angkatan? Tulis ceritamu di halaman
              detail angkatanmu masing-masing.
            </p>
            <Reveal delay={0.05} className="mx-auto mt-8 max-w-2xl">
              <GuimTestimoni items={testimoni} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-ink-900">
        <Image
          src="/gallery/tim-serah-terima.jpg"
          alt=""
          fill
          aria-hidden
          className="pointer-events-none absolute inset-0 object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/85 to-ink-900/75" />
        <div className="relative mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-300">GUIM in Data</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-paper-50 sm:text-4xl">
            Jejak Dampak per Angkatan
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-200">
            Sebagian data adalah jumlah perkiraan — lihat catatan lengkap di halaman detail tiap angkatan.
          </p>
          <Reveal className="mt-10 rounded-[4px_24px_4px_24px] bg-paper-white p-6 shadow-xl sm:p-8">
            <p className="mb-4 text-sm font-semibold text-ink-800">Jumlah Panitia &amp; Pengajar</p>
            <GuimDataChart
              angkatanLabels={angkatanList.map((a) => String(a.angkatan))}
              metrics={[
                { label: "Panitia", values: angkatanList.map((a) => a.jumlah_panitia), color: "var(--teal-600)" },
                { label: "Pengajar", values: angkatanList.map((a) => a.jumlah_pengajar), color: "var(--gold-600)" },
              ]}
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-6 rounded-[4px_24px_4px_24px] bg-paper-white p-6 shadow-xl sm:p-8">
            <p className="mb-4 text-sm font-semibold text-ink-800">Jumlah Siswa &amp; Guru Sasaran</p>
            <GuimDataChart
              angkatanLabels={angkatanList.map((a) => String(a.angkatan))}
              metrics={[
                { label: "Siswa", values: angkatanList.map((a) => a.jumlah_siswa), color: "var(--teal-600)" },
                { label: "Guru", values: angkatanList.map((a) => a.jumlah_guru), color: "var(--gold-600)" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
