"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Timeline detail angkatan — tiga fase (Pra Aksi / Aksi / Pasca Aksi) disusun
 * jadi satu spine vertikal, bukan tiga kolom terpisah. Tiap item reveal
 * bertahap saat masuk viewport. Hormati prefers-reduced-motion.
 */
export default function GuimTimeline({
  praAksi,
  aksi,
  pascaAksi,
}: {
  praAksi: string[] | null;
  aksi: string[] | null;
  pascaAksi: string[] | null;
}) {
  const reduce = useReducedMotion();
  const phases = [
    { label: "Pra Aksi", items: praAksi },
    { label: "Aksi", items: aksi },
    { label: "Pasca Aksi", items: pascaAksi },
  ].filter((p) => p.items && p.items.length > 0);

  return (
    <div className="relative border-l-2 border-teal-200 pl-7">
      {phases.map((phase) => (
        <div key={phase.label} className="pb-8 last:pb-0">
          <div className="relative">
            <span
              aria-hidden
              className="absolute -left-[37px] top-0.5 h-4 w-4 rounded-full border-2 border-teal-500 bg-paper-white"
            />
            <p className="text-xs font-bold uppercase tracking-wider text-teal-600">{phase.label}</p>
          </div>
          <ul className="mt-3 space-y-2.5">
            {phase.items!.map((item, i) => (
              <motion.li
                key={i}
                initial={reduce ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-2.5 text-sm leading-relaxed text-ink-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
