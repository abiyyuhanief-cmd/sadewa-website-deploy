import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ count: guimCount }, { count: ceritaPublished }, { count: ceritaDraft }, { count: leadsCount }] =
    await Promise.all([
      supabase.from("guim_story").select("*", { count: "exact", head: true }),
      supabase.from("cerita").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("cerita").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("leads").select("*", { count: "exact", head: true }),
    ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-600">Kelola GUIM Story dan Cerita Sadewa.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-4">
        <Link
          href="/admin/cerita-guim"
          className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6 hover:shadow-md"
        >
          <p className="font-display text-3xl font-semibold text-teal-700">{guimCount ?? 0}</p>
          <p className="mt-1 text-sm text-ink-600">Entri GUIM Story</p>
        </Link>
        <Link
          href="/admin/cerita"
          className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6 hover:shadow-md"
        >
          <p className="font-display text-3xl font-semibold text-teal-700">{ceritaPublished ?? 0}</p>
          <p className="mt-1 text-sm text-ink-600">Cerita published</p>
        </Link>
        <Link
          href="/admin/cerita"
          className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6 hover:shadow-md"
        >
          <p className="font-display text-3xl font-semibold text-ink-600">{ceritaDraft ?? 0}</p>
          <p className="mt-1 text-sm text-ink-600">Cerita draft</p>
        </Link>
        <Link
          href="/admin/leads"
          className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6 hover:shadow-md"
        >
          <p className="font-display text-3xl font-semibold text-teal-700">{leadsCount ?? 0}</p>
          <p className="mt-1 text-sm text-ink-600">Leads masuk</p>
        </Link>
      </div>
    </div>
  );
}
