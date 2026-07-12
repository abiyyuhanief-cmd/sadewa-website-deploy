"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Peta tag yang didukung — pakai komponen motion yang sudah jadi (stabil antar
// render, hindari motion(as) dinamis yang me-remount tiap render).
const TAGS = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
} as const;

export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: ReactNode;
  /** Detik jeda sebelum animasi mulai — untuk stagger antar item (mis. i * 0.08). */
  delay?: number;
  as?: keyof typeof TAGS;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      ref={ref as never}
      initial={reduceMotion ? false : { opacity: 0.4, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
