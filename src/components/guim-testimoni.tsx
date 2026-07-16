"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import type { GuimTestimoni } from "@/lib/types";

/**
 * Testimoni alumni yang tampil "bergilir": satu kartu di layar, berganti
 * otomatis tiap ~7 detik dengan crossfade. Berhenti saat di-hover/fokus supaya
 * pembaca sempat menuntaskan. Titik navigasi memungkinkan pindah manual.
 * Hormati prefers-reduced-motion: auto-rotate & animasi dimatikan, testimoni
 * disusun sebagai daftar statis biar tetap terbaca semua.
 */

const INTERVAL = 3300;

function Card({ t }: { t: GuimTestimoni }) {
  return (
    <figure className="text-center">
      <Quote className="mx-auto h-7 w-7 text-teal-300" aria-hidden strokeWidth={2} />
      <blockquote className="mt-4 font-display text-lg italic leading-relaxed text-ink-800 sm:text-xl">
        &ldquo;{t.pesan}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold text-ink-900">{t.nama}</span>
        {t.peran && <span className="text-ink-500"> · {t.peran}</span>}
      </figcaption>
    </figure>
  );
}

export default function GuimTestimoni({ items }: { items: GuimTestimoni[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) => setI((next + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (reduce || paused || items.length <= 1) return;
    timer.current = setInterval(() => {
      setI((prev) => (prev + 1) % items.length);
    }, INTERVAL);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reduce, paused, items.length]);

  if (items.length === 0) return null;

  // Reduced motion: tampilkan semua sebagai daftar statis (tanpa auto-rotate).
  if (reduce) {
    return (
      <div className="space-y-6">
        {items.map((t) => (
          <div
            key={t.id}
            className="rounded-[4px_24px_4px_24px] border border-teal-100 bg-paper-white p-6 shadow-sm sm:p-8"
          >
            <Card t={t} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="rounded-[4px_24px_4px_24px] border border-teal-100 bg-paper-white p-6 shadow-sm sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Testimoni alumni"
    >
      <div className="relative min-h-[9rem] sm:min-h-[8rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={items[i].id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card t={items[i]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => go(idx)}
              aria-label={`Testimoni ${idx + 1} dari ${items.length}`}
              aria-current={idx === i ? "true" : undefined}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-5 bg-teal-500" : "w-2 bg-teal-200 hover:bg-teal-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
