import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { GuimStory } from "@/lib/types";

export default async function AdminCeritaGuimListPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("guim_story")
    .select("*")
    .order("angkatan", { ascending: true });
  const list = (data ?? []) as GuimStory[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">GUIM Story</h1>
          <p className="mt-1 text-sm text-ink-600">{list.length} entri angkatan</p>
        </div>
        <Link
          href="/admin/cerita-guim/new"
          className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-paper-50 hover:bg-teal-700"
        >
          + Tambah Angkatan
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-paper-200 text-xs uppercase tracking-wider text-ink-500">
            <tr>
              <th className="px-5 py-3">Angkatan</th>
              <th className="px-5 py-3">Lokasi</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <tr key={a.id} className="border-b border-paper-200 last:border-b-0">
                <td className="px-5 py-3 font-semibold text-ink-900">{a.nama_angkatan}</td>
                <td className="px-5 py-3 text-ink-600">{a.kabupaten}, {a.provinsi}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      a.status === "published" ? "bg-teal-100 text-teal-700" : "bg-paper-100 text-ink-500"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/admin/cerita-guim/${a.id}`} className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
