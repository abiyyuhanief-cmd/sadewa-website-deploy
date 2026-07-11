import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuimStoryBySlug, getGuimStorySlugs } from "@/lib/guim-story-data";

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
    <div className="border-t border-paper-200 py-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl font-semibold text-ink-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] | null }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
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

  const stats = [
    { label: "Panitia", value: a.jumlah_panitia },
    { label: "Pengajar", value: a.jumlah_pengajar },
    { label: "Siswa", value: a.jumlah_siswa },
    { label: "Guru", value: a.jumlah_guru },
    { label: "SD", value: a.jumlah_sd },
    { label: "Desa", value: a.jumlah_desa },
    { label: "Kecamatan", value: a.jumlah_kecamatan },
  ].filter((s) => s.value != null);

  return (
    <>
      <section className="border-b border-paper-200 bg-ink-900 text-paper-50">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <Link href="/cerita-guim" className="text-xs font-semibold text-teal-300 hover:text-teal-200">
            ← Semua Angkatan
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            {a.nama_angkatan}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {a.kabupaten}, {a.provinsi}
          </h1>
          <p className="mt-3 text-ink-200">{a.tahun_pelaksanaan}</p>
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

      {stats.length > 0 && (
        <section className="bg-paper-100">
          <div className="mx-auto max-w-4xl px-6 py-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-[4px_20px_4px_20px] bg-paper-white p-5 text-center border border-paper-200">
                  <p className="font-display text-2xl font-semibold text-teal-700">{s.value}</p>
                  <p className="mt-1 text-xs text-ink-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper-50">
        <div className="mx-auto max-w-4xl px-6 py-14">
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
              <div className="grid gap-6 sm:grid-cols-3">
                {a.timeline_pra_aksi && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-600">Pra Aksi</p>
                    <BulletList items={a.timeline_pra_aksi} />
                  </div>
                )}
                {a.timeline_aksi && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-600">Aksi</p>
                    <BulletList items={a.timeline_aksi} />
                  </div>
                )}
                {a.timeline_pasca_aksi && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-600">Pasca Aksi</p>
                    <BulletList items={a.timeline_pasca_aksi} />
                  </div>
                )}
              </div>
            </Section>
          )}

          {a.titik_pelaksanaan.length > 0 && (
            <Section title="Titik Pelaksanaan">
              <div className="grid gap-3 sm:grid-cols-2">
                {a.titik_pelaksanaan.map((t, i) => (
                  <div key={i} className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-4">
                    <p className="text-sm font-semibold text-ink-900">{t.nama}</p>
                    {(t.desa || t.kecamatan) && (
                      <p className="mt-1 text-xs text-ink-500">
                        {[t.desa, t.kecamatan].filter(Boolean).join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {a.inovasi && (
            <Section title="Inovasi">
              <BulletList items={a.inovasi} />
            </Section>
          )}

          {a.pembaharuan && (
            <Section title="Pembaharuan">
              <BulletList items={a.pembaharuan} />
            </Section>
          )}

          {a.evaluasi_lesson_learned && (
            <Section title="Evaluasi & Lesson Learned">
              <BulletList items={a.evaluasi_lesson_learned} />
            </Section>
          )}
        </div>
      </section>
    </>
  );
}
