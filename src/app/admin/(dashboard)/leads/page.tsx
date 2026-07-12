import { getLeadsListing } from "@/lib/leads-data";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const sourceLabel: Record<string, string> = {
  home: "Home",
  about: "Tentang Kami",
  "cerita-coming-soon": "Cerita (Segera Hadir)",
};

export default async function AdminLeadsPage() {
  const leads = await getLeadsListing();

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Leads</h1>
        <p className="mt-1 text-sm text-ink-600">
          {leads.length} submission dari form &quot;Terhubung&quot; (Home &amp; Tentang Kami).
        </p>
      </div>

      {leads.length === 0 ? (
        <p className="mt-8 text-sm text-ink-600">Belum ada submission.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-paper-200 text-xs uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Bidang Kolaborasi</th>
                <th className="px-5 py-3">Sumber</th>
                <th className="px-5 py-3">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-paper-200 last:border-b-0">
                  <td className="px-5 py-3 font-semibold text-ink-900">{l.name}</td>
                  <td className="px-5 py-3">
                    <a href={`mailto:${l.email}`} className="text-teal-700 hover:text-teal-800">
                      {l.email}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-ink-700">{l.interest || "—"}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-paper-100 px-2.5 py-1 text-xs font-semibold text-ink-600">
                      {(l.source_page && sourceLabel[l.source_page]) || l.source_page || "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-ink-600">{formatDate(l.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
