import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  MessageCircleHeart,
  Users,
  Presentation,
  GraduationCap,
  BookOpen,
  School,
  Home as HomeIcon,
} from "lucide-react";
import {
  getGuimStoryBySlug,
  getGuimStorySlugs,
  getGuimStoryNav,
} from "@/lib/guim-story-data";
import { getTestimoniBySlug } from "@/lib/guim-testimoni-data";
import GuimTimeline from "@/components/guim-timeline";
import GuimBubbles from "@/components/guim-bubbles";
import GuimTitikAwan from "@/components/guim-titik-awan";
import GuimStoryNav from "@/components/guim-story-nav";
import GuimTestimoni from "@/components/guim-testimoni";
import GuimTestimoniForm from "@/components/guim-testimoni-form";
import GuimTestimoniShare from "@/components/guim-testimoni-share";

export const revalidate = 300;

export async function generateStaticParams() {
  return getGuimStorySlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const angkatan = await getGuimStoryBySlug(slug);
  if (!angkatan) return {};
  return {
    title: `${angkatan.nama_angkatan} — GUIM Story — Sadewa`,
    description: `${angkatan.kabupaten}, ${angkatan.provinsi} · ${angkatan.tahun_pelaksanaan} · ${angkatan.tema}`,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-paper-200 py-7 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-semibold text-ink-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default async function CeritaGuimDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getGuimStoryBySlug(slug);
  if (!a) notFound();
  const { prev, next } = await getGuimStoryNav(slug);
  const testimoni = await getTestimoniBySlug(slug);

  const stats = [
    { label: "Panitia", value: a.jumlah_panitia, icon: Users },
    { label: "Pengajar", value: a.jumlah_pengajar, icon: Presentation },
    { label: "Siswa", value: a.jumlah_siswa, icon: GraduationCap },
    { label: "Guru", value: a.jumlah_guru, icon: BookOpen },
    { label: "SD", value: a.jumlah_sd, icon: School },
    { label: "Desa", value: a.jumlah_desa, icon: HomeIcon },
    { label: "Kecamatan", value: a.jumlah_kecamatan, icon: MapPin },
  ].filter((s) => s.value != null);

  return (
    <>
      <section className="relative overflow-hidden border-b border-paper-200 bg-ink-900 text-paper-50">
        {/* Awan dekoratif tipis di latar hero */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 800 400"
        >
          <path
            d="M120,300 C90,300 70,280 70,255 C70,233 88,216 110,216 C114,188 139,166 169,166 C195,166 217,182 224,206 C250,207 271,227 271,252 C271,278 250,300 220,300 Z"
            fill="var(--teal-500)"
            opacity="0.06"
          />
          <path
            d="M560,120 C536,120 518,103 518,82 C518,64 533,50 551,50 C555,28 575,10 599,10 C620,10 638,23 644,42 C665,43 682,59 682,80 C682,101 665,120 641,120 Z"
            fill="var(--teal-400)"
            opacity="0.07"
          />
        </svg>
        <div className="relative mx-auto max-w-4xl px-6 py-10 sm:py-14">
          <Link href="/cerita-guim" className="text-xs font-semibold text-teal-300 hover:text-teal-200">
            ← Semua Angkatan
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            {a.nama_angkatan}
          </p>
          <h1 className="mt-2 flex items-start gap-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            <MapPin className="mt-1.5 h-6 w-6 shrink-0 text-teal-300 sm:h-7 sm:w-7" aria-hidden strokeWidth={2} />
            <span>{a.kabupaten}, {a.provinsi}</span>
          </h1>
          <p className="mt-3 flex items-center gap-2 text-ink-200">
            <Calendar className="h-4 w-4 shrink-0 text-teal-300" aria-hidden strokeWidth={2} />
            {a.tahun_pelaksanaan}
          </p>
          <p className="mt-4 max-w-xl text-lg italic leading-relaxed text-teal-100">&ldquo;{a.tema}&rdquo;</p>
          {a.tagline && <p className="mt-2 text-sm text-ink-300">Tagline: {a.tagline}</p>}
          {a.nilai && a.nilai.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {a.nilai.map((n) => (
                <span key={n} className="rounded-full bg-teal-600/90 px-3 py-1 text-xs font-semibold">
                  {n}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Navigasi antar angkatan (atas) — compact. Listener keyboard/swipe
          dipasang oleh instance bawah supaya tak dobel. */}
      <div className="border-b border-paper-200 bg-paper-100">
        <GuimStoryNav prev={prev} next={next} variant="compact" bindGlobal={false} />
      </div>

      {stats.length > 0 && (
        <section className="bg-paper-100">
          <div className="mx-auto max-w-4xl px-6 py-7">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-[4px_20px_4px_20px] bg-paper-white p-4 text-center border border-paper-200">
                  <s.icon className="mx-auto h-5 w-5 text-teal-600" aria-hidden strokeWidth={2} />
                  <p className="mt-1.5 font-display text-2xl font-semibold text-teal-700">{s.value}</p>
                  <p className="mt-0.5 text-xs text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper-50">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <Section title="Gambaran Umum">
            <p className="text-base leading-relaxed text-ink-700">{a.gambaran_umum}</p>
          </Section>

          {a.latar_belakang && (
            <Section title="Latar Belakang">
              <p className="text-base leading-relaxed text-ink-700">{a.latar_belakang}</p>
            </Section>
          )}

          {(a.timeline_pra_aksi || a.timeline_aksi || a.timeline_pasca_aksi) && (
            <Section title="Timeline">
              <GuimTimeline
                praAksi={a.timeline_pra_aksi}
                aksi={a.timeline_aksi}
                pascaAksi={a.timeline_pasca_aksi}
              />
            </Section>
          )}

          {a.titik_pelaksanaan.length > 0 && (
            <Section title="Titik Pelaksanaan">
              <p className="mb-5 text-sm text-ink-600">
                {a.titik_pelaksanaan.length} titik aksi di {a.kabupaten}.
              </p>
              <GuimTitikAwan titik={a.titik_pelaksanaan} />
            </Section>
          )}

          {a.inovasi && a.inovasi.length > 0 && (
            <Section title="Inovasi">
              <GuimBubbles items={a.inovasi} variant="teal" />
            </Section>
          )}

          {a.pembaharuan && a.pembaharuan.length > 0 && (
            <Section title="Pembaharuan">
              <GuimBubbles items={a.pembaharuan} variant="gold" />
            </Section>
          )}

          {/* Evaluasi & Lesson Learned sengaja tidak ditampilkan di publik
              (keputusan editorial). Datanya tetap tersimpan & terbaca di admin. */}
        </div>
      </section>

      {/* Testimoni alumni — engagement per angkatan. id="suara-alumni" dipakai
          sebagai target link shareable (lihat GuimTestimoniShare). */}
      <section id="suara-alumni" className="scroll-mt-20 bg-paper-100">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <MessageCircleHeart className="h-5 w-5 shrink-0 text-teal-600" aria-hidden strokeWidth={2} />
              <h2 className="font-display text-2xl font-semibold text-ink-900">Suara Alumni</h2>
            </div>
            <GuimTestimoniShare namaAngkatan={a.nama_angkatan} />
          </div>
          <p className="mt-2 max-w-xl text-sm text-ink-600">
            Kamu bagian dari {a.nama_angkatan}? Tinggalkan kenangan atau kesanmu — cerita yang
            terpilih akan tampil di sini.
          </p>

          {testimoni.length > 0 && (
            <div className="mt-8">
              <GuimTestimoni items={testimoni} />
            </div>
          )}

          <div className="mt-8 rounded-[4px_24px_4px_24px] border border-paper-200 bg-paper-white p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink-900">Tinggalkan kenanganmu</h3>
            <p className="mt-1 mb-5 text-sm text-ink-500">
              Cerita singkat, kesan, atau momen berkesanmu di angkatan ini.
            </p>
            <GuimTestimoniForm slug={slug} />
          </div>
        </div>
      </section>

      <GuimStoryNav prev={prev} next={next} />
    </>
  );
}
