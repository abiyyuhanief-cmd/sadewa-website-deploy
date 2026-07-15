"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BookMarked, GraduationCap, School, Home } from "lucide-react";
import type { GuimStory } from "@/lib/types";

/**
 * Jalur angkatan — serpentine timeline. Satu spine vertikal yang "menggambar"
 * dirinya seiring scroll (scaleY via useScroll), dengan node bernomor angkatan
 * dan kartu yang berselang-seling kiri/kanan di desktop. Di mobile spine di kiri
 * dan semua kartu di kanannya. Semua motion hormati prefers-reduced-motion, dan
 * kartu tetap terbaca meski animasi tak jalan (konten tak pernah disembunyikan
 * permanen dari spine — hanya garis teal-nya yang animasi di atas garis samar).
 */
export default function GuimJalur({ angkatanList }: { angkatanList: GuimStory[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 25%"],
  });
  const drawScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative mt-10">
      {/* Spine samar (selalu tampil) + spine teal yang menggambar saat scroll. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-[19px] w-0.5 -translate-x-1/2 bg-ink-700/40 md:left-1/2"
      />
      <motion.div
        aria-hidden
        style={{ scaleY: reduce ? 1 : drawScale }}
        className="absolute inset-y-0 left-[19px] w-0.5 origin-top -translate-x-1/2 bg-teal-400 md:left-1/2"
      />

      {angkatanList.map((a, i) => {
        const leftSide = i % 2 === 0;
        const cardSide = leftSide
          ? "md:ml-0 md:mr-auto md:pr-10"
          : "md:ml-auto md:pl-10";
        return (
          <li key={a.id} id={`angkatan-${a.angkatan}`} className="relative scroll-mt-24 pb-10 last:pb-0">
            {/* Node bernomor angkatan, duduk di atas spine. */}
            <motion.div
              aria-hidden
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-[19px] top-1 z-10 flex h-12 w-12 -translate-x-1/2 flex-col items-center justify-center rounded-full border-2 border-teal-400 bg-gradient-to-b from-ink-800 to-ink-900 shadow-[0_0_0_4px_rgba(15,23,23,1),0_8px_20px_-4px_rgba(45,212,191,0.5)] md:left-1/2"
            >
              <span className="font-display text-base font-bold leading-none tabular-nums text-teal-300">
                {a.angkatan}
              </span>
              <span className="mt-0.5 text-[9px] font-semibold leading-none tabular-nums text-teal-400/80">
                {a.tahun_pelaksanaan.match(/\d{4}/)?.[0] ?? ""}
              </span>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`ml-12 md:w-[calc(50%-2.5rem)] ${cardSide}`}
            >
              <Link
                href={`/cerita-guim/${a.slug}`}
                className="group block rounded-[4px_20px_4px_20px] bg-paper-white p-6 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600">
                  <BookMarked className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                  {a.nama_angkatan}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-900 group-hover:text-teal-700">
                  {a.kabupaten}, {a.provinsi}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{a.tahun_pelaksanaan}</p>
                <p className="mt-3 text-sm italic leading-relaxed text-ink-700">&ldquo;{a.tema}&rdquo;</p>
                {a.jumlah_siswa != null && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 rounded-[4px_10px_4px_10px] bg-teal-50 px-2.5 py-1.5 text-xs font-semibold text-teal-700">
                      <GraduationCap className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                      {a.jumlah_siswa.toLocaleString("id-ID")} siswa
                    </span>
                    {a.jumlah_sd != null && (
                      <span className="flex items-center gap-1.5 rounded-[4px_10px_4px_10px] bg-gold-100 px-2.5 py-1.5 text-xs font-semibold text-gold-600">
                        <School className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                        {a.jumlah_sd} SD
                      </span>
                    )}
                    {a.jumlah_desa != null && (
                      <span className="flex items-center gap-1.5 rounded-[4px_10px_4px_10px] bg-ink-100 px-2.5 py-1.5 text-xs font-semibold text-ink-700">
                        <Home className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                        {a.jumlah_desa} desa
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
