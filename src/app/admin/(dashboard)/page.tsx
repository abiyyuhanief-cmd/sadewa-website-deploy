import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ count: guimCount }, { count: beritaPublished }, { count: beritaDraft }] = await Promise.all([
    supabase.from("guim_story").select("*", { count: "exact", head: true }),
    supabase.from("berita").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("berita").select("*", { count: "exact", head: true }).eq("status", "draft"),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-600">Kelola Cerita GUIM dan Berita Sadewa.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <Link
          href="/admin/cerita-guim"
          className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6 hover:shadow-md"
        >
          <p className="font-display text-3xl font-semibold text-teal-700">{guimCount ?? 0}</p>
          <p className="mt-1 text-sm text-ink-600">Entri Cerita GUIM</p>
        </Link>
        <Link
          href="/admin/berita"
          className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6 hover:shadow-md"
        >
          <p className="font-display text-3xl font-semibold text-teal-700">{beritaPublished ?? 0}</p>
          <p className="mt-1 text-sm text-ink-600">Berita published</p>
        </Link>
        <Link
          href="/admin/berita"
          className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6 hover:shadow-md"
        >
          <p className="font-display text-3xl font-semibold text-ink-500">{beritaDraft ?? 0}</p>
          <p className="mt-1 text-sm text-ink-600">Berita draft</p>
        </Link>
      </div>
    </div>
  );
}
