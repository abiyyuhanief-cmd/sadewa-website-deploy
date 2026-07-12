import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Plane, Handshake, Users } from "lucide-react";
import StatCounter from "@/components/stat-counter";
import LeadForm from "@/components/lead-form";

const programs = [
  {
    title: "Training Buddy",
    desc: "Pelatihan pedagogis dasar untuk relawan nonkeguruan — bekal kompetensi profesional sebelum terjun mengajar di lapangan.",
    icon: GraduationCap,
  },
  {
    title: "Jelajah Dewantara",
    desc: "Intervensi pendidikan lintas daerah sasaran GUIM, memperkuat jejaring dan membuka akses pengetahuan bagi anak-anak daerah.",
    icon: Plane,
  },
  {
    title: "Pendampingan GUIM",
    desc: "Kolaborasi intervensi sekolah dasar selama satu bulan bersama alumni Gerakan UI Mengajar di wilayah sasaran.",
    icon: Handshake,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — FR-001 */}
      <section className="relative overflow-hidden bg-ink-900 text-paper-50">
        <Image
          src="/brand/logo-icon.png"
          alt=""
          width={520}
          height={415}
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 w-[420px] opacity-[0.14] brightness-150 sm:w-[520px]"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Image
            src="/brand/logo-icon.png"
            alt="Ikon burung Sadewa"
            width={72}
            height={58}
            className="mb-8 h-14 w-auto brightness-125"
          />
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
            Komunitas Perkumpulan · Alumni Gerakan UI Mengajar
          </p>
          <h1 className="max-w-2xl font-display text-[40px] font-semibold leading-tight sm:text-6xl">
            Sayap Dewantara Indonesia
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-200">
            Sadewa (Sayap Dewantara Indonesia) mewadahi alumni Gerakan UI Mengajar dan siapa pun yang ingin
            memberi manfaat berkelanjutan bagi pendidikan dasar di daerah pelosok.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#daftar-minat"
              className="rounded-lg bg-teal-600 px-7 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700"
            >
              Terhubung dengan Kami →
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-teal-400/50 px-7 py-3.5 text-sm font-semibold text-teal-200 transition-colors hover:border-teal-300 hover:text-teal-100"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
          <span className="mt-10 inline-flex items-center gap-2 rounded-full bg-teal-600/90 px-4 py-2 text-xs font-bold tracking-wide">
            #DedikasiUntukEdukasi
          </span>
        </div>
      </section>

      {/* About teaser — FR-002, copy unik (bukan duplikat About) */}
      <section className="border-b border-paper-200 bg-paper-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 sm:grid-cols-[1fr_1.4fr] sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Siapa Kami</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
                Bukan sekadar komunitas —{" "}
                <span className="italic text-teal-700">gerakan yang bertahan.</span>
              </h2>
            </div>
            <div>
              <p className="text-base leading-relaxed text-ink-700 sm:text-lg">
                Berawal dari semangat alumni Gerakan UI Mengajar yang enggan berhenti setelah misi kampus
                selesai, Sadewa tumbuh jadi Perkumpulan berbadan hukum yang terus merawat akses pendidikan
                di titik-titik yang jarang tersentuh. Setiap program kami dirancang untuk memperkuat apa
                yang sudah ada di lapangan — bukan menggantikannya.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                Baca sejarah lengkap kami →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik dampak — FR-003, FR-116 (angka sama dengan About & GUIM Story) */}
      <section className="bg-paper-100">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Rekam Jejak</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Dampak yang Terus Bertumbuh
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <StatCounter
              value={15}
              suffix=" th"
              label="Gerakan UI Mengajar"
              icon={<GraduationCap className="h-5 w-5" aria-hidden strokeWidth={2} />}
            />
            <StatCounter
              value={8}
              suffix=" th"
              label="Jelajah Dewantara"
              icon={<Plane className="h-5 w-5" aria-hidden strokeWidth={2} />}
            />
            <StatCounter
              value={8565}
              suffix="+"
              label="Siswa & guru SD terdampak GUIM"
              icon={<Users className="h-5 w-5" aria-hidden strokeWidth={2} />}
            />
            {/* <StatCounter value={guimCumulativeStats.siswa} suffix="+" label="Siswa & guru SD terdampak GUIM" /> */}
          </div>
          <Link
            href="/cerita-guim"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            Lihat Satu Dekade GUIM Story →
          </Link>
        </div>
      </section>

      {/* Program & Aktivitas — FR-004 */}
      <section className="bg-paper-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Program & Aktivitas</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Tiga Jalur Kontribusi
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {programs.map((p) => (
              <div
                key={p.title}
                className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-7"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-teal-100">
                  <p.icon className="h-5 w-5 text-teal-700" aria-hidden strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri aktivitas */}
      <section className="bg-paper-100">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-600">Momen</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Cerita dari Titik Sasaran
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { src: "/gallery/kelas-peta.jpg", alt: "Relawan Sadewa mendampingi siswa belajar peta Indonesia di kelas" },
              { src: "/gallery/anak-semangat.jpg", alt: "Anak-anak sekolah dasar antusias mengikuti kegiatan Sadewa" },
              { src: "/gallery/tim-sadewa.jpg", alt: "Tim Sadewa berkumpul dalam rapat awal tahun" },
              { src: "/gallery/tim-serah-terima.jpg", alt: "Serah terima Gerakan UI Mengajar angkatan 12 di Kecamatan Ngluyu" },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[3/4] overflow-hidden rounded-[4px_20px_4px_20px]">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <Link
            href="/cerita"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            Baca Cerita Lainnya →
          </Link>
        </div>
      </section>

      {/* Kolaborasi teaser + form — FR-005, FR-008 */}
      <section id="daftar-minat" className="scroll-mt-24 bg-ink-900 text-paper-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-300">Kolaborasi & Koneksi</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Mari Terhubung dengan Kami
            </h2>
            <p className="mt-4 max-w-md text-ink-200">
              Sadewa saat ini sedang tidak membuka pendaftaran relawan/anggota secara umum, namun kami
              tetap terbuka untuk kolaborasi. Tinggalkan kontakmu — kami hubungi jika ada peluang yang
              sesuai.
            </p>
          </div>
          <div className="rounded-[4px_20px_4px_20px] bg-paper-white p-7 sm:p-8">
            <LeadForm sourcePage="home" />
          </div>
        </div>
      </section>
    </>
  );
}
