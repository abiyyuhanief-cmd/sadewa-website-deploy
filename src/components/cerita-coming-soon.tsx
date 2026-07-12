"use client";

import { useState, type FormEvent } from "react";
import { Mail, Sparkles } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Empty state halaman Cerita — menggantikan pesan statis "belum ada cerita"
 * dengan ajakan daftar notifikasi. Hanya minta email (sesuai audit: form
 * sederhana), konsentnya implisit lewat microcopy di bawah tombol supaya
 * tetap memenuhi constraint RLS tabel leads (consent = true, name not null)
 * tanpa menambah friksi checkbox.
 */
export default function CeritaComingSoon() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string)?.trim() ?? "";

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setErrorMsg("Format email tidak valid.");
      return;
    }

    setStatus("submitting");
    try {
      const { error } = await getSupabase().from("leads").insert({
        name: "Newsletter Cerita",
        email,
        interest: "newsletter-cerita",
        consent: true,
        source_page: "cerita-coming-soon",
      });
      if (error) throw error;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Gagal mendaftar. Coba lagi sebentar lagi.");
    }
  }

  return (
    <div className="mt-10 rounded-[4px_32px_4px_32px] border border-paper-200 bg-paper-white px-6 py-14 text-center sm:px-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[10px] bg-teal-100">
        <Sparkles className="h-5 w-5 text-teal-700" aria-hidden strokeWidth={2} />
      </div>
      <h2 className="mt-5 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
        Cerita Baru Segera Hadir
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600">
        Kami sedang menyiapkan cerita pertama untuk halaman ini. Daftarkan email kamu, dan kami kabari
        begitu cerita pertama terbit.
      </p>

      {status === "success" ? (
        <p role="status" className="mx-auto mt-6 max-w-sm text-sm font-semibold text-teal-700">
          Terima kasih! Kami akan mengabari kamu saat cerita pertama terbit.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mx-auto mt-6 max-w-sm">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="cerita-notify-email" className="sr-only">
              Email
            </label>
            <div className="relative flex-1">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
                aria-hidden
                strokeWidth={2}
              />
              <input
                id="cerita-notify-email"
                name="email"
                type="email"
                required
                placeholder="nama@email.com"
                className="w-full rounded-lg border border-ink-200 bg-paper-white py-3 pl-10 pr-4 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-[4px_20px_4px_20px] bg-teal-600 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Mendaftar..." : "Beri Tahu Saya"}
            </button>
          </div>
          {status === "error" && (
            <p role="alert" className="mt-2 text-left text-xs font-medium text-red-600">
              {errorMsg}
            </p>
          )}
          <p className="mt-3 text-xs text-ink-500">
            Dengan mendaftar, kamu setuju dihubungi Sadewa lewat email saat cerita baru terbit.
          </p>
        </form>
      )}
    </div>
  );
}
