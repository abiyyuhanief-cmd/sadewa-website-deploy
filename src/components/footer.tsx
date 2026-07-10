import Image from "next/image";
import Link from "next/link";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "Twitter/X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-paper-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Image
            src="/brand/logo-icon.png"
            alt="Sadewa"
            width={40}
            height={32}
            className="mb-4 h-9 w-auto brightness-125"
          />
          <p className="font-display text-lg font-semibold">Sadewa — Sayap Dewantara</p>
          <p className="mt-2 text-sm text-ink-200">
            Memperkuat pendidikan dasar di daerah pelosok Indonesia bersama alumni Gerakan UI Mengajar.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal-600 px-4 py-2 text-xs font-bold tracking-wide text-paper-50">
            #DedikasiUntukEdukasi
          </span>
        </div>

        <div className="flex gap-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-300">Navigasi</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-100">
              <li>
                <Link href="/" className="hover:text-teal-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-300">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/#daftar-minat" className="hover:text-teal-300">
                  Daftar Minat
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-300">Ikuti Kami</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-100">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-teal-300">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-800 px-6 py-5 text-center text-xs text-ink-400">
        © {new Date().getFullYear()} Sayap Dewantara Indonesia. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
