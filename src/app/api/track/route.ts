import { createHash } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { SUPABASE_SERVICE_ROLE_KEY } from "@/lib/env";

// Penerima beacon dari <AnalyticsTracker />. Sengaja selalu balas 204 tanpa body:
// endpoint ini tidak boleh pernah mengganggu pengunjung, dan tidak ada informasi
// apa pun yang perlu dikembalikan ke browser.
const NO_CONTENT = new Response(null, { status: 204 });

// Preview link (WhatsApp/Telegram/Slack), crawler, dan monitoring tidak dihitung.
const BOT_UA =
  /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|discord|slackbot|embedly|preview|headless|lighthouse|pingdom|uptime|curl|wget|python-requests|axios|node-fetch|go-http/i;

const TABLET_UA = /ipad|tablet|playbook|silk|kindle|(android(?!.*mobi))/i;
const MOBILE_UA = /mobi|iphone|ipod|android|blackberry|iemobile|opera mini/i;

const SALT = process.env.ANALYTICS_SALT || SUPABASE_SERVICE_ROLE_KEY;

// Route handler ini jalan sekali per tampilan halaman, jadi client Supabase-nya
// dibuat sekali per instance lalu dipakai ulang — bukan dibangun ulang tiap
// request. Lazy supaya modul tetap bisa di-load kalau service role key kosong
// (createAdminClient melempar), dan gagalnya cukup ditelan seperti error lain.
let adminClient: ReturnType<typeof createAdminClient> | null = null;

function getAdminClient() {
  adminClient ??= createAdminClient();
  return adminClient;
}

function detectDevice(ua: string): "mobile" | "tablet" | "desktop" {
  if (TABLET_UA.test(ua)) return "tablet";
  if (MOBILE_UA.test(ua)) return "mobile";
  return "desktop";
}

/**
 * Identitas pengunjung tanpa cookie: hash dari IP + user-agent + salt + tanggal.
 * Salt dan tanggal ikut di-hash supaya hash tidak bisa di-brute force balik jadi
 * IP dan tidak bisa dipakai melacak orang yang sama lintas hari.
 */
function visitorHash(ip: string, ua: string) {
  const today = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(`${SALT}|${today}|${ip}|${ua}`).digest("hex").slice(0, 32);
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Terima hanya path internal yang wajar; buang query, hash, dan halaman admin. */
function normalizePath(raw: unknown): string | null {
  if (typeof raw !== "string" || !raw.startsWith("/") || raw.startsWith("//")) return null;
  const path = raw.split(/[?#]/)[0].replace(/(.)\/+$/, "$1");
  if (path.startsWith("/admin") || path.startsWith("/api")) return null;
  return path.length > 200 ? null : path;
}

/** Hostname perujuk tanpa "www."; null untuk kunjungan langsung & rujukan internal. */
function referrerHost(raw: unknown, selfHost: string | null): string | null {
  if (typeof raw !== "string" || !raw) return null;
  try {
    const url = new URL(raw);
    // Hanya web. Skema lain (android-app://, app://) menghasilkan "host" palsu.
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    // Host header bisa membawa port (localhost:3000) — dibuang agar navigasi
    // internal di dev tidak tercatat sebagai sumber rujukan.
    const self = selfHost?.split(":")[0].replace(/^www\./, "").toLowerCase();
    if (!host || host === self) return null;

    return host.slice(0, 120);
  } catch {
    return null;
  }
}

function utmSource(raw: unknown): string | null {
  if (typeof raw !== "string" || !raw) return null;
  const value = raw.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 60);
  return value || null;
}

export async function POST(request: Request) {
  try {
    const ua = request.headers.get("user-agent") ?? "";
    if (!ua || BOT_UA.test(ua)) return NO_CONTENT;

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return NO_CONTENT;

    const path = normalizePath((body as Record<string, unknown>).path);
    if (!path) return NO_CONTENT;

    const host = request.headers.get("host");
    await getAdminClient().from("page_views").insert({
      visitor_hash: visitorHash(clientIp(request), ua),
      path,
      referrer_host: referrerHost((body as Record<string, unknown>).ref, host),
      utm_source: utmSource((body as Record<string, unknown>).utm),
      device: detectDevice(ua),
    });
  } catch {
    // Analytics tidak boleh jadi sumber error di sisi pengunjung — telan diam-diam.
  }

  return NO_CONTENT;
}
