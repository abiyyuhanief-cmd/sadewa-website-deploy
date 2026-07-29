"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Beacon page view ke /api/track. Dipasang sekali di root layout dan ikut
 * mencatat navigasi client-side (App Router tidak reload halaman).
 *
 * Sengaja tidak memakai useSearchParams supaya tidak memaksa seluruh layout
 * jadi dynamic — query dibaca langsung dari window di dalam effect.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();
  // Guard dobel-kirim: StrictMode dev me-remount effect, dan beberapa navigasi
  // me-render ulang tanpa ganti path.
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const payload = JSON.stringify({
      path: pathname,
      ref: document.referrer || null,
      utm: new URLSearchParams(window.location.search).get("utm_source"),
    });

    const sent = navigator.sendBeacon?.(
      "/api/track",
      new Blob([payload], { type: "application/json" })
    );

    if (!sent) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
