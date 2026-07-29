import Link from "next/link";
import {
  ANALYTICS_RANGES,
  type AnalyticsBucket,
  type AnalyticsRange,
  type AnalyticsSummary,
} from "@/lib/analytics-data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/** "2026-07-29" → "29 Jul". Diparse manual supaya tidak bergeser karena zona waktu. */
function formatDay(day: string) {
  const [, month, date] = day.split("-");
  return `${Number(date)} ${MONTHS[Number(month) - 1]}`;
}

/** Detik → "1 mnt 24 dtk" / "42 dtk". Dibulatkan, tanpa desimal — cukup untuk gambaran kasar. */
function formatDuration(seconds: number) {
  const s = Math.round(seconds);
  if (s < 60) return `${s} dtk`;
  const m = Math.floor(s / 60);
  const rest = s % 60;
  return rest === 0 ? `${m} mnt` : `${m} mnt ${rest} dtk`;
}

function formatPercent(ratio: number) {
  return `${Math.round(ratio * 100)}%`;
}

const deviceLabel: Record<string, string> = {
  mobile: "Ponsel",
  tablet: "Tablet",
  desktop: "Desktop",
};

// Host perujuk yang sering muncul dirapikan jadi nama platform; sisanya tampil apa adanya.
const sourceLabel: Record<string, string> = {
  direct: "Langsung / bookmark",
  "google.com": "Google",
  "google.co.id": "Google",
  "instagram.com": "Instagram",
  "l.instagram.com": "Instagram",
  "facebook.com": "Facebook",
  "lm.facebook.com": "Facebook",
  "m.facebook.com": "Facebook",
  "t.co": "X / Twitter",
  "linkedin.com": "LinkedIn",
  "youtube.com": "YouTube",
  "chatgpt.com": "ChatGPT",
  "bing.com": "Bing",
};

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6">
      <p className="font-display text-3xl font-semibold text-teal-700">{value}</p>
      <p className="mt-1 text-sm font-semibold text-ink-700">{label}</p>
      <p className="mt-1 text-xs text-ink-500">{hint}</p>
    </div>
  );
}

function chartSummary(buckets: AnalyticsBucket[]) {
  const busiest = buckets.reduce((a, b) => (b.views > a.views ? b : a), buckets[0]);
  return `Grafik tampilan halaman per hari. Tertinggi ${formatDay(busiest.day)} dengan ${busiest.views} tampilan.`;
}

/**
 * Grafik batang harian — div polos, tanpa library chart dan tanpa JS di client.
 * Tooltip dibuat dari CSS (group-hover), bukan atribut `title` bawaan browser:
 * `title` punya delay ~500ms–1s dan tidak bisa distyle, jadi terasa lambat.
 */
function DailyChart({ buckets }: { buckets: AnalyticsBucket[] }) {
  const max = Math.max(1, ...buckets.map((b) => b.views));
  // Rentang panjang: hanya sebagian label tanggal dicetak agar tidak tumpang tindih.
  const labelEvery = Math.ceil(buckets.length / 8);
  // Bar di ~6% tepi kiri/kanan: tooltip disejajarkan ke tepi (bukan center) supaya
  // tidak terpotong keluar kartu di layar sempit.
  const edgeCount = Math.max(1, Math.round(buckets.length * 0.06));

  return (
    <div>
      <div className="flex h-40 items-end gap-[3px]" role="img" aria-label={chartSummary(buckets)}>
        {buckets.map((b, i) => {
          const heightPct = b.views > 0 ? Math.max((b.views / max) * 100, 3) : 1.5;
          const tooltipPos =
            i < edgeCount ? "left-0" : i >= buckets.length - edgeCount ? "right-0" : "left-1/2 -translate-x-1/2";

          return (
            <div key={b.day} className="group relative flex h-full min-w-[2px] flex-1 items-end">
              <div
                className="w-full rounded-t-[3px] bg-teal-500/85 transition-colors group-hover:bg-teal-600"
                style={{ height: `${heightPct}%` }}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute bottom-full z-20 mb-1.5 whitespace-nowrap rounded-md bg-ink-900 px-2 py-1 text-[11px] text-paper-white opacity-0 shadow-md transition-opacity duration-100 group-hover:opacity-100 ${tooltipPos}`}
              >
                <span className="font-semibold">{formatDay(b.day)}</span> · {b.views} tampilan ·{" "}
                {b.visitors} pengunjung
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-[3px]">
        {buckets.map((b, i) => (
          <span key={b.day} className="min-w-[3px] flex-1 text-center text-[10px] text-ink-500">
            {i % labelEvery === 0 ? formatDay(b.day) : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Baris "top list": bar proporsional sebagai latar, label kiri, angka (+ meta opsional) kanan. */
function BreakdownRow({
  label,
  value,
  share,
  meta,
}: {
  label: string;
  value: number;
  share: number;
  meta?: string;
}) {
  return (
    <li className="relative flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
      <span
        aria-hidden
        className="absolute inset-y-1 left-1 rounded-[3px] bg-teal-100"
        style={{ width: `calc(${Math.max(share * 100, 2)}% - 8px)` }}
      />
      {/* min-w-0: tanpa ini flex item tidak mau menyusut, jadi path panjang
          melebar keluar kartu di layar sempit alih-alih terpotong. */}
      <span className="relative min-w-0 truncate text-ink-800">{label}</span>
      <span className="relative shrink-0 tabular-nums text-ink-700">
        <span className="font-semibold">{value.toLocaleString("id-ID")}</span>
        {meta ? <span className="ml-1 text-xs text-ink-500">{meta}</span> : null}
      </span>
    </li>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white">
      <header className="border-b border-paper-200 px-5 py-4">
        <h2 className="font-display text-base font-semibold text-ink-900">{title}</h2>
        <p className="mt-0.5 text-xs text-ink-500">{subtitle}</p>
      </header>
      {children}
    </section>
  );
}

export default function AnalyticsView({
  summary,
  range,
}: {
  summary: AnalyticsSummary;
  range: AnalyticsRange;
}) {
  const { totals, by_day, top_pages, sources, devices, exit_pages } = summary;

  const perSession = totals.sessions > 0 ? totals.views / totals.sessions : 0;
  const maxPageViews = Math.max(1, ...top_pages.map((p) => p.views));
  const maxSourceViews = Math.max(1, ...sources.map((s) => s.views));
  const maxExitViews = Math.max(1, ...exit_pages.map((e) => e.exits));
  const deviceTotal = Math.max(1, devices.reduce((sum, d) => sum + d.views, 0));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-900">Analytics</h1>
          <p className="mt-1 text-sm text-ink-600">
            Trafik situs publik, dihitung sendiri tanpa cookie dan tanpa tracker pihak ketiga.
          </p>
        </div>
        <nav className="flex rounded-lg border border-paper-200 bg-paper-white p-1">
          {ANALYTICS_RANGES.map((days) => (
            <Link
              key={days}
              href={`/admin/analytics?range=${days}`}
              aria-current={range === days ? "page" : undefined}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                range === days ? "bg-teal-700 text-paper-white" : "text-ink-600 hover:bg-paper-100"
              }`}
            >
              {days} hari
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Pengunjung unik"
          value={totals.visitors.toLocaleString("id-ID")}
          hint="Dihitung per hari, tanpa cookie"
        />
        <StatCard
          label="Sesi"
          value={totals.sessions.toLocaleString("id-ID")}
          hint="Jeda 30 menit = sesi baru"
        />
        <StatCard
          label="Tampilan halaman"
          value={totals.views.toLocaleString("id-ID")}
          hint={`Total ${range} hari terakhir`}
        />
        <StatCard
          label="Halaman per sesi"
          value={perSession.toFixed(1)}
          hint="Makin tinggi, makin dalam dijelajah"
        />
        <StatCard
          label="Rata-rata durasi kunjungan"
          value={formatDuration(totals.avg_duration_seconds)}
          hint="Selisih view pertama–terakhir per sesi"
        />
        <StatCard
          label="Bounce rate"
          value={formatPercent(totals.bounce_rate)}
          hint="Sesi yang cuma buka 1 halaman"
        />
      </div>

      {totals.views === 0 ? (
        <p className="mt-8 rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white px-5 py-8 text-center text-sm text-ink-600">
          Belum ada kunjungan tercatat pada rentang ini. Data mulai terkumpul begitu halaman publik
          dibuka pengunjung.
        </p>
      ) : (
        <>
          <section className="mt-8 rounded-[4px_20px_4px_20px] border border-paper-200 bg-paper-white p-6">
            <h2 className="font-display text-base font-semibold text-ink-900">Tren harian</h2>
            <p className="mt-0.5 mb-5 text-xs text-ink-500">
              Tampilan halaman per hari (waktu Jakarta). Arahkan kursor ke batang untuk detail.
            </p>
            <DailyChart buckets={by_day} />
          </section>

          {/* grid-cols-1 eksplisit: tanpa itu kolom implisit berukuran max-content,
              dan satu path panjang membuat kartu melebar keluar layar di mobile. */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Panel title="Halaman terpopuler" subtitle="Berdasarkan jumlah tampilan">
              <ul className="divide-y divide-paper-200 py-1">
                {top_pages.map((p) => (
                  <BreakdownRow
                    key={p.path}
                    label={p.path}
                    value={p.views}
                    share={p.views / maxPageViews}
                  />
                ))}
              </ul>
            </Panel>

            <Panel title="Sumber trafik" subtitle="Situs perujuk atau parameter utm_source">
              <ul className="divide-y divide-paper-200 py-1">
                {sources.map((s) => (
                  <BreakdownRow
                    key={s.source}
                    label={sourceLabel[s.source] ?? s.source}
                    value={s.views}
                    share={s.views / maxSourceViews}
                  />
                ))}
              </ul>
            </Panel>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Panel title="Halaman keluar" subtitle="Tempat pengunjung paling sering berhenti">
              {exit_pages.length === 0 ? (
                <p className="px-5 py-6 text-sm text-ink-500">Belum cukup data.</p>
              ) : (
                <ul className="divide-y divide-paper-200 py-1">
                  {exit_pages.map((e) => (
                    <BreakdownRow
                      key={e.path}
                      label={e.path}
                      value={e.exits}
                      share={e.exits / maxExitViews}
                      meta={`(${formatPercent(e.exit_rate)} keluar)`}
                    />
                  ))}
                </ul>
              )}
            </Panel>

            <Panel title="Perangkat" subtitle="Ditebak dari user-agent browser">
              <div className="grid gap-4 p-5 sm:grid-cols-3 lg:grid-cols-1">
                {devices.map((d) => (
                  <div key={d.device}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold text-ink-800">
                        {deviceLabel[d.device] ?? d.device}
                      </span>
                      <span className="text-sm tabular-nums text-ink-600">
                        {formatPercent(d.views / deviceTotal)}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-paper-200">
                      <div
                        className="h-2 rounded-full bg-teal-500"
                        style={{ width: `${(d.views / deviceTotal) * 100}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-ink-500">{d.views.toLocaleString("id-ID")} tampilan</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}
