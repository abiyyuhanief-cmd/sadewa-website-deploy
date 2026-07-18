"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

/**
 * Tombol "bagikan" khusus section Suara Alumni — menyalin URL halaman + anchor
 * #suara-alumni (lihat id di page.tsx) supaya link yang dibagikan ke alumni
 * langsung scroll ke form testimoni, bukan cuma ke atas halaman. Ini versi
 * ringan dari ide "kartu shareable" yang sempat dibahas — cukup satu link,
 * tanpa perlu generate gambar.
 */
export default function GuimTestimoniShare({ namaAngkatan }: { namaAngkatan: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}${window.location.pathname}#suara-alumni`;
    const text = `Kamu alumni ${namaAngkatan}? Yuk bagikan kenanganmu di sini: ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({ text, url });
        return;
      } catch {
        // Dibatalkan user atau tidak didukung — lanjut fallback copy-link.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API gagal (mis. permission) — abaikan, tombol tetap aman diklik lagi.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-paper-white px-3.5 py-1.5 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-50"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden strokeWidth={2.5} />
          Link disalin!
        </>
      ) : (
        <>
          <Link2 className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
          Ajak alumni lain
        </>
      )}
    </button>
  );
}
