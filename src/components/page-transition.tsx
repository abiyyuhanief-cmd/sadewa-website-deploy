"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Fade-in halus tiap kali route berganti. Sengaja tanpa animasi exit — App
 * Router tidak menahan halaman lama untuk exit, jadi fade-in per pathname
 * adalah pendekatan paling robust. Hormati prefers-reduced-motion.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
