import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Presentation, School, MapPin, BookMarked } from "lucide-react";
import { getGuimStoryListing } from "@/lib/guim-story-data";
import { guimCumulativeStats } from "@/lib/guim-stats";
import GuimDataChart from "@/components/guim-data-chart";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "GUIM Story — Sadewa",
  description:
    "Rekam jejak 10 angkatan Gerakan UI Mengajar (GUIM) — dari Garut hingga Pesisir Barat, satu dekade intervensi pendidikan dasar di pelosok Indonesia.",
};

export default async function CeritaGuimPage() {
  const angkatanList = await getGuimStoryListing();

  return (
    <>
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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {angkatanList.map((a) => (
              <Link
                key={a.id}
                href={`/cerita-guim/${a.slug}`}
                className="group rounded-[4px_20px_4px_20px] bg-paper-white p-6 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600">
                  <BookMarked className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                  {a.nama_angkatan}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-900 group-hover:text-teal-700">
                  {a.kabupaten}, {a.provinsi}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{a.tahun_pelaksanaan}</p>
                <p className="mt-3 text-sm italic leading-relaxed text-ink-700">&ldquo;{a.tema}&rdquo;</p>
                {a.jumlah_siswa != null && (
                  <p className="mt-4 text-xs text-ink-600">
                    {a.jumlah_siswa.toLocaleString("id-ID")} siswa &middot; {a.jumlah_sd} SD
                    {a.jumlah_desa != null ? ` · ${a.jumlah_desa} desa` : ""}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

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
          <div className="mt-10 rounded-[4px_24px_4px_24px] bg-paper-white p-6 shadow-xl sm:p-8">
            <p className="mb-4 text-sm font-semibold text-ink-800">Jumlah Panitia &amp; Pengajar</p>
            <GuimDataChart
              angkatanLabels={angkatanList.map((a) => String(a.angkatan))}
              metrics={[
                { label: "Panitia", values: angkatanList.map((a) => a.jumlah_panitia), color: "var(--teal-600)" },
                { label: "Pengajar", values: angkatanList.map((a) => a.jumlah_pengajar), color: "var(--gold-600)" },
              ]}
            />
          </div>
          <div className="mt-6 rounded-[4px_24px_4px_24px] bg-paper-white p-6 shadow-xl sm:p-8">
            <p className="mb-4 text-sm font-semibold text-ink-800">Jumlah Siswa &amp; Guru Sasaran</p>
            <GuimDataChart
              angkatanLabels={angkatanList.map((a) => String(a.angkatan))}
              metrics={[
                { label: "Siswa", values: angkatanList.map((a) => a.jumlah_siswa), color: "var(--teal-600)" },
                { label: "Guru", values: angkatanList.map((a) => a.jumlah_guru), color: "var(--gold-600)" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
