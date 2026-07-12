import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Presentation, School, MapPin } from "lucide-react";
import { getGuimStoryListing } from "@/lib/guim-story-data";
import { guimCumulativeStats } from "@/lib/guim-stats";
import GuimDataChart from "@/components/guim-data-chart";
import GuimJalur from "@/components/guim-jalur";
import Reveal from "@/components/reveal";

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
          <GuimJalur angkatanList={angkatanList} />
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
