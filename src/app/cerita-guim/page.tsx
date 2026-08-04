import type { Metadata } from "next";
import Image from "next/image";
import {
  GraduationCap,
  Presentation,
  School,
  MapPin,
  MessageCircleHeart,
  Gavel,
  Route,
  Zap,
  ShoppingBasket,
} from "lucide-react";
import { getGuimStoryListing } from "@/lib/guim-story-data";
import { getAllTestimoni } from "@/lib/guim-testimoni-data";
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

  // Agregat real dari data angkatan yang sudah published — bukan angka hardcoded,
  // supaya kartu hero ikut bertambah begitu cerita angkatan baru ditambahkan.
  const heroStats = angkatanList.reduce(
    (acc, a) => {
      acc.siswa += a.jumlah_siswa ?? 0;
      acc.guru += a.jumlah_guru ?? 0;
      acc.sd += a.jumlah_sd ?? 0;
      acc.provinsi.add(a.provinsi);
      return acc;
    },
    { siswa: 0, guru: 0, sd: 0, provinsi: new Set<string>() }
  );

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
            15 Tahun
            <br />Gerakan UI Mengajar
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-200">
            Sepuluh angkatan pertama, satu tujuan yang bertahan: memotivasi anak usia sekolah dasar di
            daerah pelosok, dengan manfaat yang berkelanjutan. Gerakan ini terus berlanjut — kini
            memasuki angkatan ke-16 — dan GUIM Story akan terus diperbarui seiring perjalanan setiap
            angkatan baru.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: GraduationCap, value: heroStats.siswa.toLocaleString("id-ID") + "+", label: "Siswa unik" },
              { icon: Presentation, value: heroStats.guru.toLocaleString("id-ID") + "+", label: "Guru unik" },
              { icon: School, value: heroStats.sd, label: "Sekolah dasar" },
              { icon: MapPin, value: heroStats.provinsi.size, label: "Provinsi" },
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
            <GuimMap documentedAngkatan={angkatanList.map((a) => a.angkatan)} />
          </Reveal>

          {/* Kriteria "daerah pelosok" — hasil kesepakatan Musyawarah Besar kedua GUIM.
              Frasa ini dipakai di banyak halaman tapi tidak pernah didefinisikan; blok
              ini yang menjawab "kenapa titik aksinya di situ". */}
          <Reveal delay={0.1} className="mt-10">
            <h3 className="font-display text-2xl font-semibold text-ink-900">
              Apa yang Disebut &ldquo;Daerah Pelosok&rdquo;?
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">
              Bukan istilah yang dipakai longgar. Lewat Musyawarah Besar, GUIM menyepakati kriteria
              konkretnya — sebuah wilayah cukup memenuhi salah satu dari tiga poin berikut untuk masuk
              pertimbangan titik aksi.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Route,
                  title: "Akses sulit & mahal",
                  desc: "Tidak ada jalan raya, bergantung jadwal atau cuaca tertentu, hanya bisa ditempuh berjalan kaki, atau terhalang hambatan alam besar.",
                },
                {
                  icon: Zap,
                  title: "Fasilitas umum minim",
                  desc: "Fasilitas pendidikan, kesehatan, listrik, informasi-komunikasi, dan air bersih tidak tersedia atau sangat terbatas.",
                },
                {
                  icon: ShoppingBasket,
                  title: "Kebutuhan pokok mahal",
                  desc: "Harga-harga tinggi dan/atau sulitnya ketersediaan pangan, sandang, serta papan atau perumahan.",
                },
              ].map((k) => (
                <div
                  key={k.title}
                  className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-teal-100">
                    <k.icon className="h-5 w-5 text-teal-700" aria-hidden strokeWidth={2} />
                  </div>
                  <p className="font-display text-base font-semibold text-ink-900">{k.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{k.desc}</p>
                </div>
              ))}
            </div>
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

      {/* Visi & nilai per periode — hasil Musyawarah Besar. Redaksi visi & nilai
          dikutip persis dari keputusan forum, jadi jangan diparafrase. */}
      <section className="bg-paper-50">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-600">
            <Gavel className="h-4 w-4" aria-hidden strokeWidth={2} />
            Musyawarah Besar
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Visi yang Diuji Ulang Tiap Lima Tahun
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">
            Setiap lima angkatan, perwakilan seluruh angkatan GUIM berkumpul dalam Musyawarah Besar untuk
            menilai apakah visi dan nilai yang berlaku masih relevan — lalu menyepakati rumusan untuk lima
            tahun berikutnya.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              {
                periode: "GUIM 6–10",
                mubes: "Mubes I · 2016, pasca-GUIM 5",
                current: false,
                visi:
                  "Terwujudnya Gerakan UI Mengajar yang memotivasi siswa di Sekolah Dasar daerah pelosok agar menjadi unggul dan menginspirasi Indonesia serta berkelanjutan.",
                nilai: ["Pendidikan", "Pengabdian Masyarakat", "Sinergis"],
              },
              {
                periode: "GUIM 11–15",
                mubes: "Mubes II · setelah satu dekade GUIM",
                current: true,
                visi:
                  "Menjadi wadah pengabdian masyarakat di bidang pendidikan yang memiliki manfaat keberlanjutan dan menyebarkan semangat inspirasi dengan memotivasi anak usia sekolah dasar di daerah pelosok.",
                nilai: ["Adaptif", "Semangat Belajar", "Dedikatif"],
              },
            ].map((p, i) => (
              <Reveal
                key={p.periode}
                delay={i * 0.08}
                className={`rounded-[4px_24px_4px_24px] border bg-paper-white p-7 sm:p-8 ${
                  p.current ? "border-teal-600" : "border-paper-200"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-xl font-semibold text-ink-900">{p.periode}</p>
                  {p.current && (
                    <span className="rounded-full bg-teal-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-paper-50">
                      Berlaku sekarang
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-teal-600">
                  {p.mubes}
                </p>
                <p className="mt-4 border-l-2 border-paper-200 pl-4 text-base italic leading-relaxed text-ink-700">
                  &ldquo;{p.visi}&rdquo;
                </p>
                <p className="mt-6 text-xs font-bold uppercase tracking-wider text-ink-500">Nilai</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.nilai.map((n) => (
                    <span
                      key={n}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.current ? "bg-teal-100 text-teal-800" : "bg-paper-100 text-ink-600"
                      }`}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
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
