"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Tentang Kami" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper-50/90 backdrop-blur border-b border-paper-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-horizontal.png"
            alt="Sadewa — Sayap Dewantara Indonesia"
            width={160}
            height={36}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-ink-700 transition-colors hover:text-teal-700"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#daftar-minat"
            className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700"
          >
            Daftar Minat
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-paper-200 bg-paper-50 px-6 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-base font-semibold text-ink-700 hover:bg-paper-100"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#daftar-minat"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-teal-600 px-4 py-3 text-center text-base font-semibold text-paper-50"
          >
            Daftar Minat
          </Link>
        </nav>
      )}
    </header>
  );
}
