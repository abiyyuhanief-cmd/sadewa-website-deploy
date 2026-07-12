"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/reveal";

type GalleryImage = { src: string; alt: string };

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const isOpen = active !== null;

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    // Cegah scroll latar saat lightbox terbuka.
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, go]);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((img, i) => (
          <Reveal key={img.src} delay={i * 0.08} className="group relative aspect-[3/4] overflow-hidden rounded-[4px_20px_4px_20px]">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Perbesar foto: ${img.alt}`}
              className="absolute inset-0 h-full w-full cursor-zoom-in"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Galeri foto"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper-50 hover:bg-white/20"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Foto sebelumnya"
              className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper-50 hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Foto berikutnya"
              className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-paper-50 hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} />
            </button>

            <motion.figure
              key={active}
              className="relative flex max-h-[85vh] max-w-4xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={images[active!].src}
                alt={images[active!].alt}
                width={1200}
                height={800}
                className="h-auto max-h-[80vh] w-auto rounded-[4px_20px_4px_20px] object-contain"
              />
              <figcaption className="mt-3 max-w-xl text-center text-sm text-ink-200">
                {images[active!].alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
