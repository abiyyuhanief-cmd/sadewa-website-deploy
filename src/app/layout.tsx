import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import AnalyticsTracker from "@/components/analytics-tracker";
import {
  IS_PRODUCTION_SITE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "500", "600", "700"],
  style: ["normal", "italic"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  // Basis semua URL relatif di metadata (canonical, og:image, dst).
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Halaman anak cukup menulis "Tentang Kami" → jadi "Tentang Kami — Sadewa".
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Sadewa",
    "Sayap Dewantara Indonesia",
    "Gerakan UI Mengajar",
    "GUIM",
    "pendidikan dasar",
    "relawan pendidikan",
    "pendidikan daerah pelosok",
  ],
  authors: [{ name: "Sayap Dewantara Indonesia", url: SITE_URL }],
  creator: "Sayap Dewantara Indonesia",
  publisher: "Sayap Dewantara Indonesia",
  // Nomor telepon/alamat di teks tidak diubah jadi link otomatis oleh iOS.
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_TITLE,
    locale: "id_ID",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: IS_PRODUCTION_SITE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          // Izinkan thumbnail besar & cuplikan teks panjang di hasil pencarian.
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
  // Diisi setelah domain didaftarkan di Google Search Console (opsional).
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  // Warna bar browser di mobile — brand teal-500.
  themeColor: "#208ca9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper-50 text-ink-900">
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
