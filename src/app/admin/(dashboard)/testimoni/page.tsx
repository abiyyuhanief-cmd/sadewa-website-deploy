import { createClient } from "@/lib/supabase/server";
import type { GuimTestimoni } from "@/lib/types";
import { approveTestimoni, unpublishTestimoni, deleteTestimoni } from "./actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminTestimoniPage() {
  const supabase = await createClient();
  // Pending dulu (butuh tinjauan), lalu terbaru.
  const { data } = await supabase
    .from("guim_testimoni")
    .select("*")
    .order("status", { ascending: true }) // 'pending' < 'published'
    .order("created_at", { ascending: false });
  const list = (data ?? []) as GuimTestimoni[];
  const pending = list.filter((t) => t.status === "pending").length;

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Testimoni Alumni</h1>
        <p className="mt-1 text-sm text-ink-600">
          {list.length} testimoni · {pending} menunggu tinjauan
        </p>
      </div>

      {list.length === 0 ? (
        <p className="mt-8 text-sm text-ink-600">Belum ada testimoni masuk.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {list.map((t) => (
            <div
              key={t.id}
              className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink-900">
                    {t.nama}
                    {t.peran && <span className="font-normal text-ink-500"> · {t.peran}</span>}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {t.guim_slug} · {formatDate(t.created_at)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    t.status === "published" ? "bg-teal-100 text-teal-700" : "bg-gold-100 text-gold-600"
                  }`}
                >
                  {t.status === "published" ? "tampil" : "menunggu"}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink-700">{t.pesan}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {t.status === "pending" ? (
                  <form action={approveTestimoni}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="slug" value={t.guim_slug} />
                    <button
                      type="submit"
                      className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-paper-50 hover:bg-teal-700"
                    >
                      Tampilkan
                    </button>
                  </form>
                ) : (
                  <form action={unpublishTestimoni}>
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="slug" value={t.guim_slug} />
                    <button
                      type="submit"
                      className="rounded-lg border border-ink-200 px-4 py-2 text-xs font-semibold text-ink-700 hover:bg-paper-100"
                    >
                      Sembunyikan
                    </button>
                  </form>
                )}
                <form action={deleteTestimoni}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="slug" value={t.guim_slug} />
                  <button
                    type="submit"
                    className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
