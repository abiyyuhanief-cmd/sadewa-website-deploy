import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/lead-form";
import { guimCumulativeStats } from "@/lib/guim-stats";

export const metadata: Metadata = {
  title: "Tentang Kami — Sadewa",
  description:
    "Sejarah, misi, dan status badan hukum Sayap Dewantara Indonesia (Sadewa) — Perkumpulan yang diinisiasi alumni Gerakan UI Mengajar.",
};

const timeline = [
  {
    icon: "🌱",
    tag: "Titik awal — 2011",
    title: "GUIM 1 berangkat ke Garut",
    desc: "Gerakan UI Mengajar (GUIM) memulai jejak intervensi pendidikan dasar di Kabupaten Garut, Jawa Barat — cikal bakal garis keturunan langsung Sadewa hari ini.",
  },
  {
    icon: "🏛️",
    tag: "Kelahiran Sadewa",
    title: "Alumni GUIM mendirikan Perkumpulan",
    desc: "Agar kepedulian tidak berhenti saat masa penugasan kampus usai, sekelompok alumni GUIM mendirikan Sayap Dewantara Indonesia sebagai badan hukum Perkumpulan — wadah resmi untuk mewujudkan manfaat pendidikan yang berkelanjutan.",
  },
  {
    icon: "✈️",
    tag: "Perluasan program",
    title: "Jelajah Dewantara dimulai",
    desc: "Delapan tahun lalu, Sadewa memperluas jangkauan lewat Jelajah Dewantara — program intervensi lintas daerah yang menjadi katalisator jejaring dan kemandirian pendidikan di wilayah sasaran GUIM.",
  },
  {
    icon: "📚",
    tag: "10 Angkatan Pertama — Terdokumentasi",
    title: `${guimCumulativeStats.siswa.toLocaleString("id-ID")}+ siswa & ${guimCumulativeStats.guru.toLocaleString("id-ID")}+ guru terdampak`,
    desc: `Sepuluh angkatan pertama GUIM telah menjangkau ${guimCumulativeStats.sd} SD di ${guimCumulativeStats.desa} desa, ${guimCumulativeStats.kecamatan} kecamatan, ${guimCumulativeStats.kabupaten} kabupaten, dan ${guimCumulativeStats.provinsi} provinsi — rekam jejak yang kini bisa dibaca lengkap per angkatan di GUIM Story.`,
  },
  {
    icon: "🚀",
    tag: "Berlanjut",
    title: "GUIM Melangkah ke Angkatan 16",
    desc: "Estafet regenerasi pengajar terus berjalan jauh melampaui 10 angkatan pertama — GUIM 15 baru saja rampung dan GUIM 16 sedang berjalan. GUIM Story akan terus diperbarui seiring dokumentasi tiap angkatan baru selesai disusun.",
    logo: true,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero narasi */}
      <section className="relative overflow-hidden border-b border-paper-200 bg-paper-50">
        <Image
          src="/gallery/sekolah-pramuka.jpg"
          alt=""
          fill
          aria-hidden
          className="pointer-events-none absolute inset-0 object-cover opacity-[0.10]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Tentang Kami</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">
            Perkumpulan yang Lahir dari Kepedulian yang Tak Ingin Berhenti.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-700">
            Sayap Dewantara Indonesia (Sadewa) adalah komunitas berbadan hukum Perkumpulan, diinisiasi
            oleh alumni Gerakan UI Mengajar (GUIM), didirikan untuk mewadahi alumni GUIM dan berbagai
            pihak dalam memberikan manfaat berkelanjutan bagi pendidikan dasar di daerah pelosok Indonesia.
          </p>
        </div>
      </section>

      {/* Narasi lengkap — FR-006 */}
      <section className="relative overflow-hidden bg-paper-50">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] sm:block">
          <Image
            src="/gallery/anak-semangat.jpg"
            alt=""
            fill
            aria-hidden
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper-50 via-paper-50/40 to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-teal-100 text-lg">
              💡
            </div>
            <h2 className="font-display text-2xl font-semibold text-ink-900">Kenapa Kami Ada</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700">
              Program pengajaran kampus punya batas waktu, tapi kebutuhan anak-anak di daerah pelosok
              tidak berhenti begitu penugasan selesai. Dari kegelisahan itu, alumni GUIM memilih untuk
              tidak sekadar kembali ke rutinitas masing-masing — mereka membangun Sadewa sebagai rumah
              bersama untuk melanjutkan kontribusi secara terstruktur dan bertanggung jawab secara hukum.
            </p>
          </div>
          <div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-teal-100 text-lg">
              ⚖️
            </div>
            <h2 className="font-display text-2xl font-semibold text-ink-900">Status Badan Hukum & Relasi dengan GUIM</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-700">
              Sadewa berdiri sebagai Perkumpulan yang sah secara hukum, terpisah secara struktur namun
              tetap terhubung erat secara garis keturunan dengan Gerakan UI Mengajar. Alumni GUIM secara
              alami menjadi anggota Sadewa, menjadikan komunitas ini kelanjutan formal dari semangat yang
              tumbuh di GUIM — bukan organisasi baru yang lahir tanpa akar.
            </p>
          </div>
        </div>
      </section>

      {/* Wajah di balik Sadewa — humanisasi organisasi */}
      <section className="bg-paper-100">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">🤝 Wajah di Balik Sadewa</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Dijalankan oleh Alumni, untuk Keberlanjutan
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-700">
            Di balik setiap angkatan GUIM dan program Sadewa, ada pengurus yang meluangkan waktu di luar
            pekerjaan utama mereka — rapat rutin, evaluasi program, hingga urusan administrasi badan
            hukum — semata agar dedikasi ini tidak berhenti di satu angkatan saja.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px_24px_4px_24px]">
              <Image
                src="/gallery/tim-pengurus.jpg"
                alt="Pengurus Sadewa berkumpul dalam rapat awal tahun"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px_24px_4px_24px]">
              <Image
                src="/gallery/rapat-pengurus.jpg"
                alt="Rapat koordinasi pengurus Sadewa bersama mitra lapangan"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline — FR-007, angka sama dengan Home, framing beda */}
      <section className="relative overflow-hidden bg-ink-900 text-paper-50">
        <Image
          src="/gallery/anak-mural.jpg"
          alt=""
          fill
          aria-hidden
          className="pointer-events-none absolute inset-0 object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/95 via-ink-900/90 to-ink-900" />
        <div className="relative mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-300">Perjalanan Kami</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Dari GUIM ke Sadewa</h2>
          <ol className="mt-12 space-y-10 border-l border-ink-700 pl-8">
            {timeline.map((t) => (
              <li key={t.title} className="relative">
                <span className="absolute -left-[38px] top-1 h-3 w-3 rounded-full bg-teal-400" />
                <p className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  {t.icon} {t.tag}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-paper-50">{t.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-200">{t.desc}</p>
                {t.logo && (
                  <div className="mt-4 flex items-center gap-3 rounded-[4px_16px_4px_16px] border border-ink-700 bg-white/5 px-4 py-3">
                    <Image
                      src="/brand/logo-guim-11.png"
                      alt="Logo resmi Gerakan UI Mengajar angkatan 11"
                      width={80}
                      height={40}
                      className="h-8 w-auto"
                    />
                    <p className="text-xs text-ink-300">Salah satu logo resmi angkatan pasca-GUIM Story: GUIM 11</p>
                  </div>
                )}
              </li>
            ))}
          </ol>
          <Link
            href="/cerita-guim"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700"
          >
            Lihat GUIM Story Lengkap →
          </Link>
        </div>
      </section>

      {/* Partner GUIM */}
      <section className="bg-paper-50">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-col items-center gap-6 rounded-[4px_24px_4px_24px] border border-paper-200 bg-paper-white p-8 sm:flex-row">
            <Image
              src="/brand/partner-guim-v2.png"
              alt="Logo Gerakan UI Mengajar"
              width={205}
              height={100}
              className="h-14 w-auto"
            />
            <div className="hidden h-10 w-px bg-paper-200 sm:block" />
            <p className="text-sm text-ink-600">
              Gerakan UI Mengajar adalah mitra dan akar sejarah Sadewa — ditampilkan di sini sebagai bentuk
              kredit kolaborasi, dengan identitas visualnya sendiri yang dipertahankan apa adanya.
            </p>
          </div>
        </div>
      </section>

      {/* CTA form — dapat diakses dari About juga (FR-008) */}
      <section id="daftar-minat" className="scroll-mt-24 bg-paper-100">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Kolaborasi</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Ingin Berkolaborasi dengan Kami?
          </h2>
          <p className="mt-4 text-ink-600">
            Tinggalkan kontakmu — kami hubungi jika ada peluang kolaborasi yang sesuai.
          </p>
          <div className="mt-8 rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-7 text-left sm:p-8">
            <LeadForm sourcePage="about" />
          </div>
        </div>
      </section>
    </>
  );
}
