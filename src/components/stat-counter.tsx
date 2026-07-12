"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function StatCounter({
  value,
  suffix = "",
  label,
  icon,
}: {
  value: number;
  suffix?: string;
  label: string;
  icon?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Reduced motion: skip count-up, render final value directly (see `shown`).
    if (!inView || reduceMotion) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, reduceMotion]);

  const shown = reduceMotion ? value : display;

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[4px_20px_4px_20px] bg-ink-900 p-7"
    >
      {icon && (
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] bg-teal-300/15 text-teal-300">
          {icon}
        </div>
      )}
      <p className="font-display text-4xl font-semibold tabular-nums text-teal-300 sm:text-[40px]">
        {shown.toLocaleString("id-ID")}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-ink-200">{label}</p>
    </motion.div>
  );
}
