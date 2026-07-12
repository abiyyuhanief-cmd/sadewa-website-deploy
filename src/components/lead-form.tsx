"use client";

import { useState, type FormEvent } from "react";
import { getSupabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm({ sourcePage }: { sourcePage: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bot spam mitigation (NFR §6.2)
    if ((data.get("company") as string)?.length > 0) {
      setStatus("success");
      return;
    }

    const name = (data.get("name") as string)?.trim() ?? "";
    const email = (data.get("email") as string)?.trim() ?? "";
    const interest = (data.get("interest") as string)?.trim() ?? "";
    const consent = data.get("consent") === "on";

    if (!name || !EMAIL_RE.test(email) || !consent) {
      setStatus("error");
      setErrorMsg(
        !name
          ? "Nama wajib diisi."
          : !EMAIL_RE.test(email)
            ? "Format email tidak valid."
            : "Kamu perlu menyetujui penggunaan data untuk melanjutkan."
      );
      return;
    }

    setStatus("submitting");
    try {
      const { error } = await getSupabase().from("leads").insert({
        name,
        email,
        interest: interest || null,
        consent,
        source_page: sourcePage,
      });

      if (error) throw error;

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Gagal mengirim data. Coba lagi sebentar lagi.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[4px_20px_4px_20px] border border-teal-200 bg-teal-50 p-8 text-center"
      >
        <p className="font-display text-xl font-semibold text-teal-800">Terima kasih sudah menghubungi kami!</p>
        <p className="mt-2 text-sm text-ink-600">
          Tim Sadewa akan menghubungi kamu jika ada peluang kolaborasi yang sesuai.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="hidden">
        <label htmlFor="company">Perusahaan</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Nama lengkap
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Nama kamu"
          className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="nama@email.com"
          className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
        />
      </div>

      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Bidang kolaborasi <span className="font-normal text-ink-500">(opsional)</span>
        </label>
        <input
          id="interest"
          name="interest"
          type="text"
          placeholder="mis. kolaborasi program, donasi, media partner"
          className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
        />
      </div>

      <label htmlFor="consent" className="flex items-start gap-3 text-sm text-ink-700">
        {/* Padding di sekitar checkbox memperluas hit area ke ~24x24px tanpa mengubah ukuran visualnya. */}
        <span className="-m-1.5 flex shrink-0 items-center justify-center p-1.5">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-ink-300 text-teal-600 focus:ring-teal-500"
          />
        </span>
        <span className="pt-1">
          Saya setuju data ini digunakan Sadewa untuk menghubungi saya terkait peluang kolaborasi.
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-[4px_20px_4px_20px] bg-teal-600 px-6 py-3.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Mengirim..." : "Hubungi Kami"}
      </button>
    </form>
  );
}
