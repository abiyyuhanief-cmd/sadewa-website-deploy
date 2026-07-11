import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Berita } from "@/lib/types";

export default async function AdminBeritaListPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("berita")
    .select("*")
    .order("created_at", { ascending: false });
  const list = (data ?? []) as Berita[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Berita</h1>
          <p className="mt-1 text-sm text-ink-600">{list.length} artikel</p>
        </div>
        <Link
          href="/admin/berita/new"
          className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-paper-50 hover:bg-teal-700"
        >
          + Tulis Berita
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="mt-8 text-sm text-ink-600">Belum ada artikel.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-paper-200 text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-5 py-3">Judul</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {list.map((b) => (
                <tr key={b.id} className="border-b border-paper-200 last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-ink-900">{b.judul}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        b.status === "published" ? "bg-teal-100 text-teal-700" : "bg-paper-100 text-ink-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/berita/${b.id}`} className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
