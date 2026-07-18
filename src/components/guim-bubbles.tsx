"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Poin-poin (Inovasi / Pembaharuan) dikemas sebagai gelembung/chip, bukan bullet
 * list lurus. Gelembung muncul bertahap saat masuk viewport (stagger) lalu DIAM
 * — tidak ada animasi mengambang terus-menerus. Hormati prefers-reduced-motion:
 * kalau aktif, tampil langsung tanpa animasi masuk.
 *
 * Palet mengikuti brand: varian `teal` (sky/laut) & `gold` (aksen hangat).
 */

const VARIANTS = {
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-900",
    dot: "bg-teal-500",
    ring: "hover:border-teal-300",
  },
  gold: {
    bg: "bg-gold-100",
    border: "border-gold-500/40",
    text: "text-ink-800",
    dot: "bg-gold-500",
    ring: "hover:border-gold-500/70",
  },
} as const;

export default function GuimBubbles({
  items,
  variant = "teal",
}: {
  items: string[] | null;
  variant?: keyof typeof VARIANTS;
}) {
  const reduce = useReducedMotion();
  const v = VARIANTS[variant];
  if (!items || items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-full"
        >
          <span
            className={`inline-flex items-center gap-2.5 rounded-full border ${v.bg} ${v.border} ${v.ring} px-4 py-2.5 text-sm leading-snug ${v.text} shadow-sm transition-colors`}
          >
            <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${v.dot}`} />
            <span>{item}</span>
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
