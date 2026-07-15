"use client";

import { useState } from "react";
import Image from "next/image";
import { guimLocations, type GuimLocation } from "@/lib/guim-locations";

/**
 * Peta sebaran GUIM: latar foto diorama clay 3D (Sumatra + Jawa, AI-generated,
 * lihat `/public/gallery/guim-map-terrain.jpg`) dengan pin lokasi kabupaten
 * di-overlay lewat SVG yang viewBox-nya mengikuti rasio ASLI gambar (lihat
 * IMG_W/IMG_H — update kedua angka ini kalau file gambarnya di-crop ulang,
 * jangan dipaksa ke rasio tertentu seperti 16:9, supaya crop apa pun dari
 * sumbernya selalu tampil utuh tanpa ke-crop ulang oleh CSS). Posisi tiap pin
 * dikalibrasi manual sebagai persen (lihat guim-locations.ts) — bukan
 * proyeksi geografis presisi.
 *
 * Pin memakai bentuk teardrop mengkilap agar senada dengan look 3D clay gambar,
 * diwarnai dari palet brand situs (teal/gold/ink di globals.css). Digambar dua
 * lapis: badan pin diurut utara→selatan (yang di depan menimpa yang di
 * belakang), lalu SEMUA label di lapisan teratas supaya tak ada pin yang
 * menutupi teks. Label pakai Figtree (font body situs).
 *
 * Pin angkatan yang sudah terdokumentasi (1-10) bisa diklik — scroll halus ke
 * kartu angkatan yang bersangkutan di section "Pilih Angkatan untuk Cerita
 * Lengkap" (GuimJalur, yang tiap <li>-nya diberi id="angkatan-{n}"). Untuk
 * kabupaten gabungan seperti "9, 10" dituju angkatan pertama yang disebut.
 * Pin angkatan baru (11-15) belum punya kartu untuk dituju, jadi klik hanya
 * menampilkan info di panel bawah (sama seperti hover/fokus).
 */

// Dimensi asli /public/gallery/guim-map-terrain.jpg — update kalau file
// gambarnya diganti/di-crop ulang dengan rasio berbeda (cek: `file public/gallery/guim-map-terrain.jpg`).
const IMG_W = 2746;
const IMG_H = 1055;

const VB_W = 1000;
const VB_H = (VB_W * IMG_H) / IMG_W;
const HEAD_DY = 25; // tinggi kepala pin dari titik tumpu

// Teardrop pin: titik tumpu di (0,0), kepala di (0,-HEAD_DY), radius 8.5.
const PIN_PATH =
  "M0,0 C-5,-10 -8.5,-14 -8.5,-19.5 A8.5,8.5 0 1 1 8.5,-19.5 C8.5,-14 5,-10 0,0 Z";

// "9, 10" -> "9" — angkatan pertama yang disebut untuk kabupaten gabungan.
function firstAngkatan(angkatan: string): string {
  return angkatan.split(",")[0].trim();
}

function scrollToAngkatan(angkatan: string) {
  document.getElementById(`angkatan-${firstAngkatan(angkatan)}`)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function labelFontStyle() {
  return {
    fontFamily: "var(--font-body), ui-sans-serif, system-ui, sans-serif",
  } as const;
}

function PinBody({ loc, active }: { loc: GuimLocation; active: boolean }) {
  const x = (loc.xPct / 100) * VB_W;
  const y = (loc.yPct / 100) * VB_H;
  const headY = y - HEAD_DY;

  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Bayangan lonjong di permukaan tanah — ink-950 dengan alpha */}
      <ellipse cx={0} cy={0} rx={6} ry={2.2} fill="rgba(24,30,32,0.45)" />
      {/* Cincin saat hover/fokus */}
      {active && (
        <circle
          cx={0}
          cy={-19.5}
          r={15}
          fill="none"
          stroke={loc.documented ? "var(--teal-300)" : "var(--gold-500)"}
          strokeWidth={2}
          opacity={0.9}
        />
      )}
      {/* Halo putus-putus untuk angkatan yang belum terdokumentasi */}
      {!loc.documented && (
        <circle
          cx={0}
          cy={-19.5}
          r={12.5}
          fill="none"
          stroke="var(--gold-600)"
          strokeWidth={1.6}
          strokeDasharray="3.5 3"
        />
      )}
      {/* Badan teardrop + gloss */}
      <path
        d={PIN_PATH}
        fill={loc.documented ? "url(#guim-pin-teal)" : "url(#guim-pin-gold)"}
        stroke={loc.documented ? "var(--teal-800)" : "var(--gold-600)"}
        strokeWidth={1}
        filter="url(#guim-pin-shadow)"
      />
      {/* Lubang tengah (kesan marker) — paper-white */}
      <circle cx={0} cy={-19.5} r={3.2} fill="var(--paper-white)" fillOpacity={0.92} />
      {/* Sorot kilap */}
      <ellipse cx={-2.6} cy={-23} rx={2.6} ry={1.6} fill="var(--paper-white)" fillOpacity={0.6} />
      {/* penanda posisi kepala untuk label (tak tampak) */}
      <circle cx={0} cy={headY - y} r={0} fill="none" />
    </g>
  );
}

function PinLabel({ loc }: { loc: GuimLocation }) {
  const x = (loc.xPct / 100) * VB_W;
  const y = (loc.yPct / 100) * VB_H;
  const headY = y - HEAD_DY;
  const label = loc.documented ? loc.kabupaten : `“${loc.kabupaten}”`;
  const labelY = headY - 7 + (loc.labelDy ?? 0);

  return (
    <text
      x={x + (loc.labelDx ?? 0)}
      y={labelY}
      textAnchor={loc.labelAnchor ?? "middle"}
      fontSize={12.5}
      fontWeight={700}
      fontStyle={loc.documented ? "normal" : "italic"}
      style={labelFontStyle()}
      fill="var(--ink-900)"
      stroke="var(--paper-white)"
      strokeWidth={3.2}
      paintOrder="stroke"
      className="pointer-events-none select-none"
    >
      {label}
    </text>
  );
}

export default function GuimMap() {
  const [active, setActive] = useState<GuimLocation | null>(null);
  // Badan pin diurut utara→selatan supaya yang lebih "depan" menimpa yang belakang.
  const byDepth = [...guimLocations].sort((a, b) => a.yPct - b.yPct);

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden rounded-2xl bg-teal-100 shadow-inner">
        <Image
          src="/gallery/guim-map-terrain.jpg"
          alt="Diorama peta 3D Pulau Sumatra dan Jawa"
          width={IMG_W}
          height={IMG_H}
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="block h-auto w-full"
        />
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Titik kabupaten aksi GUIM di atas peta Sumatra dan Jawa"
        >
          <defs>
            <radialGradient id="guim-pin-teal" cx="0.35" cy="0.28" r="0.95">
              <stop offset="0%" stopColor="var(--teal-200)" />
              <stop offset="55%" stopColor="var(--teal-500)" />
              <stop offset="100%" stopColor="var(--teal-800)" />
            </radialGradient>
            <radialGradient id="guim-pin-gold" cx="0.35" cy="0.28" r="0.95">
              <stop offset="0%" stopColor="var(--gold-100)" />
              <stop offset="55%" stopColor="var(--gold-500)" />
              <stop offset="100%" stopColor="var(--gold-600)" />
            </radialGradient>
            {/* feDropShadow tak selalu resolve CSS var lintas browser, jadi
                dihardcode ke hex ink-950 (#181e20) yang sama */}
            <filter id="guim-pin-shadow" x="-60%" y="-40%" width="220%" height="200%">
              <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#181e20" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Lapis 1: badan pin (interaktif), urut kedalaman */}
          {byDepth.map((loc) => (
            <g
              key={loc.kabupaten + loc.angkatan}
              tabIndex={0}
              role="button"
              aria-label={`${loc.kabupaten}, ${loc.provinsi} — GUIM angkatan ${loc.angkatan}${
                loc.documented ? ", klik untuk buka cerita lengkap" : " (belum ada di GUIM Story)"
              }`}
              onMouseEnter={() => setActive(loc)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(loc)}
              onBlur={() => setActive(null)}
              onClick={() => {
                setActive(loc);
                if (loc.documented) scrollToAngkatan(loc.angkatan);
              }}
              onKeyDown={(e) => {
                if (loc.documented && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  scrollToAngkatan(loc.angkatan);
                }
              }}
              className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400"
            >
              <PinBody loc={loc} active={active === loc} />
            </g>
          ))}

          {/* Lapis 2: semua label, selalu di atas semua pin */}
          {guimLocations.map((loc) => (
            <PinLabel key={loc.kabupaten + loc.angkatan} loc={loc} />
          ))}
        </svg>
      </div>

      <div className="mt-3 min-h-[3rem] rounded-lg bg-ink-50 px-4 py-2.5 text-sm text-ink-700">
        {active ? (
          <>
            <span className="font-semibold text-ink-900">
              {active.kabupaten}, {active.provinsi}
            </span>{" "}
            — GUIM angkatan {active.angkatan}
            {active.documented ? (
              <span className="ml-1.5 text-xs font-semibold text-teal-600">Klik pin untuk buka cerita lengkap →</span>
            ) : (
              <span className="ml-1.5 rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-600">
                belum ada di GUIM Story
              </span>
            )}
          </>
        ) : (
          <span className="text-ink-500">Arahkan kursor atau fokus ke pin untuk detail angkatan.</span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-600">
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-full border"
            style={{ background: "var(--teal-500)", borderColor: "var(--teal-800)" }}
          />
          Terdokumentasi lengkap di GUIM Story (angkatan 1–10)
        </span>
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-dashed"
            style={{ borderColor: "var(--gold-600)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold-500)" }} />
          </span>
          &ldquo;Angkatan (11–15)&rdquo;--belum ada di GUIM Story
        </span>
      </div>
      <p className="mt-2 text-[11px] text-ink-500">
        Latar peta adalah ilustrasi 3D, bukan peta geografis presisi.
      </p>

      {/* Alternatif tabel untuk pembaca layar (WCAG — data-table) */}
      <table className="sr-only">
        <caption>Daftar kabupaten titik aksi GUIM per angkatan</caption>
        <thead>
          <tr>
            <th scope="col">Kabupaten</th>
            <th scope="col">Provinsi</th>
            <th scope="col">Angkatan</th>
            <th scope="col">Status dokumentasi</th>
          </tr>
        </thead>
        <tbody>
          {guimLocations.map((loc) => (
            <tr key={loc.kabupaten + loc.angkatan}>
              <td>{loc.kabupaten}</td>
              <td>{loc.provinsi}</td>
              <td>{loc.angkatan}</td>
              <td>{loc.documented ? "Terdokumentasi lengkap" : "Belum ada di GUIM Story"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
