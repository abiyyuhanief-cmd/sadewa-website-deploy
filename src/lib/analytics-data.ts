import { createClient } from "@/lib/supabase/server";

// Hanya by_day yang membawa `visitors` — dipakai di tooltip grafik harian.
// Breakdown lain sengaja tidak menghitungnya (lihat migrasi 0010): count(distinct)
// per grup itu mahal dan angkanya tidak pernah ditampilkan.
export type AnalyticsBucket = { day: string; views: number; visitors: number };
export type AnalyticsPage = { path: string; views: number };
export type AnalyticsSource = { source: string; views: number };
export type AnalyticsDevice = { device: "mobile" | "tablet" | "desktop"; views: number };
// exit_rate: proporsi tampilan halaman ini yang berakhir jadi penutup sesi (0–1).
export type AnalyticsExitPage = { path: string; exits: number; views: number; exit_rate: number };

export type AnalyticsSummary = {
  days: number;
  totals: {
    views: number;
    visitors: number;
    sessions: number;
    avg_duration_seconds: number;
    bounce_rate: number;
  };
  by_day: AnalyticsBucket[];
  top_pages: AnalyticsPage[];
  sources: AnalyticsSource[];
  devices: AnalyticsDevice[];
  exit_pages: AnalyticsExitPage[];
};

export const ANALYTICS_RANGES = [7, 30, 90] as const;
export type AnalyticsRange = (typeof ANALYTICS_RANGES)[number];

export function parseRange(raw: string | string[] | undefined): AnalyticsRange {
  const value = Number(Array.isArray(raw) ? raw[0] : raw);
  return (ANALYTICS_RANGES as readonly number[]).includes(value) ? (value as AnalyticsRange) : 7;
}

// Admin-only — cookie-auth client; RLS "page_views_admin_select" yang menjaga.
// Semua agregasi dikerjakan Postgres (analytics_summary) supaya halaman admin
// cukup satu round-trip dan tidak pernah menarik baris mentah.
export async function getAnalyticsSummary(days: AnalyticsRange): Promise<AnalyticsSummary> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("analytics_summary", { p_days: days });

  if (error) throw error;
  return data as AnalyticsSummary;
}
