import Reveal from "@/components/reveal";
import type { TitikPelaksanaan } from "@/lib/types";

/**
 * Titik pelaksanaan (desa/sekolah dalam satu kabupaten) dikemas sebagai kartu
 * berbentuk awan yang tersebar di atas latar langit — lebih ringan & lembut
 * dari peta-rute, tapi tak sekaku grid. Kartu tampil bertahap saat discroll
 * (Reveal), lalu diam (statis, tanpa animasi terus-menerus).
 *
 * Bentuk awan dibuat dari siluet SVG yang di-stretch mengikuti ukuran kartu
 * (preserveAspectRatio="none"); teks diberi padding lega agar tetap di massa
 * tengah awan. Ukuran & offset vertikal divariasikan ringan per index supaya
 * terasa mengambang acak, bukan berbaris.
 */

const CLOUD_PATH =
  "M46,112 C23,112 8,97 8,78 C8,61 21,49 38,49 C41,29 58,15 78,15 C97,15 113,28 117,46 C135,47 150,60 150,78 C150,97 133,112 110,112 Z";

// Variasi lembut per posisi (deterministik) — offset vertikal & skala.
const OFFSETS = [0, 18, 6, 22, 10, 14];
const SCALES = [1, 0.94, 1.04, 0.97, 1.02, 0.95];

function meta(t: TitikPelaksanaan): string {
  return [t.desa, t.kecamatan].filter(Boolean).join(", ");
}

export default function GuimTitikAwan({ titik }: { titik: TitikPelaksanaan[] }) {
  if (titik.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-[4px_24px_4px_24px] border border-teal-100 bg-gradient-to-b from-teal-50 to-paper-50 px-4 py-10 sm:px-8 sm:py-12">
      {/* Awan dekoratif latar (tak interaktif) */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 300"
      >
        <path d={CLOUD_PATH} transform="translate(20,20) scale(0.9)" fill="var(--teal-100)" opacity="0.5" />
        <path d={CLOUD_PATH} transform="translate(250,140) scale(1.1)" fill="var(--teal-100)" opacity="0.4" />
        <path d={CLOUD_PATH} transform="translate(150,190) scale(0.7)" fill="var(--teal-100)" opacity="0.45" />
      </svg>

      <ul className="relative flex flex-wrap items-center justify-center gap-x-5 gap-y-6 sm:gap-x-8 sm:gap-y-8">
        {titik.map((t, i) => {
          const dy = OFFSETS[i % OFFSETS.length];
          const scale = SCALES[i % SCALES.length];
          return (
            <Reveal as="li" key={i} delay={i * 0.08} className="w-[15rem] max-w-full">
              <div
                className="relative flex min-h-[7.5rem] items-center justify-center px-8 py-6 text-center"
                style={{ transform: `translateY(${dy}px) scale(${scale})` }}
              >
                {/* Siluet awan sebagai latar kartu */}
                <svg
                  aria-hidden
                  className="absolute inset-0 h-full w-full drop-shadow-sm"
                  preserveAspectRatio="none"
                  viewBox="0 0 158 127"
                >
                  <path
                    d={CLOUD_PATH}
                    fill="var(--paper-white)"
                    stroke="var(--teal-200)"
                    strokeWidth="2"
                  />
                </svg>
                <span className="relative px-1">
                  <span className="block text-sm font-semibold leading-snug text-ink-900">
                    {t.nama}
                  </span>
                  {meta(t) && (
                    <span className="mt-1 block text-xs text-ink-500">{meta(t)}</span>
                  )}
                </span>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
