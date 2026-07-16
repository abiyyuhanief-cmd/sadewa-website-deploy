"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GuimStoryNavItem } from "@/lib/guim-story-data";

/**
 * Navigasi seamless antar angkatan di halaman detail GUIM Story:
 * - Dua kartu prev/next (selalu tampil kalau ada tetangga).
 * - Panah kiri/kanan keyboard → pindah angkatan (di-guard: diabaikan saat fokus
 *   di input/textarea/select/contenteditable atau ada modifier).
 * - Geser (swipe) horizontal di layar sentuh → pindah angkatan.
 * Router.push dipakai supaya transisi client-side (halaman sudah di-prefetch
 * lewat <Link>).
 */
export default function GuimStoryNav({
  prev,
  next,
  variant = "full",
  bindGlobal = true,
}: {
  prev: GuimStoryNavItem | null;
  next: GuimStoryNavItem | null;
  /** "compact" = bar tipis untuk di atas (dekat hero); "full" = kartu di bawah. */
  variant?: "compact" | "full";
  /** Hanya SATU instance yang boleh true, supaya listener keyboard/swipe tak dobel. */
  bindGlobal?: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    const prevHref = prev ? `/cerita-guim/${prev.slug}` : null;
    const nextHref = next ? `/cerita-guim/${next.slug}` : null;

    // Prefetch tetangga supaya perpindahan terasa instan.
    if (prevHref) router.prefetch(prevHref);
    if (nextHref) router.prefetch(nextHref);

    // Listener global (keyboard/swipe) hanya dipasang oleh satu instance.
    if (!bindGlobal) return;

    function isTypingTarget(el: EventTarget | null): boolean {
      const node = el as HTMLElement | null;
      if (!node) return false;
      const tag = node.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        node.isContentEditable
      );
    }

    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (isTypingTarget(e.target)) return;
      if (e.key === "ArrowLeft" && prevHref) {
        router.push(prevHref);
      } else if (e.key === "ArrowRight" && nextHref) {
        router.push(nextHref);
      }
    }

    let startX = 0;
    let startY = 0;
    let tracking = false;
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) {
        tracking = false;
        return;
      }
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      // Hanya geser mendatar yang jelas (bukan scroll vertikal).
      if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
      if (dx > 0 && prevHref) {
        router.push(prevHref); // geser ke kanan → angkatan sebelumnya
      } else if (dx < 0 && nextHref) {
        router.push(nextHref); // geser ke kiri → angkatan berikutnya
      }
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [prev, next, router, bindGlobal]);

  if (!prev && !next) return null;

  // Varian compact — bar tipis untuk ditaruh di atas (dekat hero).
  if (variant === "compact") {
    return (
      <nav
        aria-label="Navigasi antar angkatan"
        className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-6 py-2.5"
      >
        {prev ? (
          <Link
            href={`/cerita-guim/${prev.slug}`}
            className="group inline-flex min-w-0 items-center gap-2 rounded-full border border-paper-200 bg-paper-white px-3.5 py-1.5 text-sm text-ink-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-teal-600 transition-transform group-hover:-translate-x-0.5" aria-hidden strokeWidth={2} />
            <span className="truncate font-semibold">{prev.nama_angkatan}</span>
          </Link>
        ) : (
          <span aria-hidden />
        )}
        {next ? (
          <Link
            href={`/cerita-guim/${next.slug}`}
            className="group inline-flex min-w-0 items-center gap-2 rounded-full border border-paper-200 bg-paper-white px-3.5 py-1.5 text-sm text-ink-700 transition-colors hover:border-teal-300 hover:bg-teal-50"
          >
            <span className="truncate font-semibold">{next.nama_angkatan}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-teal-600 transition-transform group-hover:translate-x-0.5" aria-hidden strokeWidth={2} />
          </Link>
        ) : (
          <span aria-hidden />
        )}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Navigasi antar angkatan"
      className="mx-auto max-w-4xl px-6 pb-14"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/cerita-guim/${prev.slug}`}
            className="group flex items-center gap-3 rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-4 transition-colors hover:border-teal-300 hover:bg-teal-50 focus-visible:border-teal-400"
          >
            <ArrowLeft
              className="h-5 w-5 shrink-0 text-teal-600 transition-transform group-hover:-translate-x-0.5"
              aria-hidden
              strokeWidth={2}
            />
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink-500">
                Angkatan sebelumnya
              </span>
              <span className="block truncate font-display text-sm font-semibold text-ink-900">
                {prev.nama_angkatan}
              </span>
              <span className="block truncate text-xs text-ink-500">
                {prev.kabupaten}, {prev.provinsi}
              </span>
            </span>
          </Link>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}

        {next ? (
          <Link
            href={`/cerita-guim/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-[20px_4px_20px_4px] border border-paper-200 bg-paper-white p-4 text-right transition-colors hover:border-teal-300 hover:bg-teal-50 focus-visible:border-teal-400"
          >
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-ink-500">
                Angkatan berikutnya
              </span>
              <span className="block truncate font-display text-sm font-semibold text-ink-900">
                {next.nama_angkatan}
              </span>
              <span className="block truncate text-xs text-ink-500">
                {next.kabupaten}, {next.provinsi}
              </span>
            </span>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-teal-600 transition-transform group-hover:translate-x-0.5"
              aria-hidden
              strokeWidth={2}
            />
          </Link>
        ) : (
          <span aria-hidden className="hidden sm:block" />
        )}
      </div>

      <p className="mt-3 text-center text-xs text-ink-500">
        Geser atau tekan <kbd className="font-semibold">←</kbd>{" "}
        <kbd className="font-semibold">→</kbd> untuk berpindah angkatan.
      </p>
    </nav>
  );
}
