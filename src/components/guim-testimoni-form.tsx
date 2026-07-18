"use client";

import { useState, type FormEvent } from "react";
import { getSupabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Form testimoni alumni per angkatan. Submission masuk sebagai 'pending' (RLS
 * memaksa status pending) dan baru tampil setelah admin approve — jadi tak ada
 * konten publik yang langsung muncul tanpa moderasi. Honeypot untuk redam bot.
 */
export default function GuimTestimoniForm({ slug }: { slug: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if ((data.get("website") as string)?.length > 0) {
      setStatus("success");
      return;
    }

    const nama = (data.get("nama") as string)?.trim() ?? "";
    const peran = (data.get("peran") as string)?.trim() ?? "";
    const pesan = (data.get("pesan") as string)?.trim() ?? "";

    if (!nama || !pesan) {
      setStatus("error");
      setErrorMsg(!nama ? "Nama wajib diisi." : "Ceritakan kenanganmu dulu ya.");
      return;
    }
    if (pesan.length > 1000) {
      setStatus("error");
      setErrorMsg("Pesan terlalu panjang (maks. 1000 karakter).");
      return;
    }

    setStatus("submitting");
    try {
      const { error } = await getSupabase().from("guim_testimoni").insert({
        guim_slug: slug,
        nama,
        peran: peran || null,
        pesan,
      });
      if (error) throw error;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Gagal mengirim. Coba lagi sebentar lagi.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[4px_20px_4px_20px] border border-teal-200 bg-teal-50 p-6 text-center"
      >
        <p className="font-display text-lg font-semibold text-teal-800">Terima kasih! 🌤️</p>
        <p className="mt-1.5 text-sm text-ink-600">
          Kenanganmu sudah terkirim dan akan tampil setelah ditinjau tim Sadewa.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      <div className="hidden">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Nama
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            required
            maxLength={80}
            placeholder="Nama kamu"
            className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
        <div>
          <label htmlFor="peran" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Peran <span className="font-normal text-ink-500">(opsional)</span>
          </label>
          <input
            id="peran"
            name="peran"
            type="text"
            maxLength={80}
            placeholder="mis. Pengajar, Panitia"
            className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="pesan" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Kenangan / kesan kamu
        </label>
        <textarea
          id="pesan"
          name="pesan"
          required
          rows={4}
          maxLength={1000}
          placeholder="Cerita singkat pengalamanmu di angkatan ini…"
          className="w-full resize-y rounded-lg border border-ink-200 bg-paper-white px-4 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-[4px_20px_4px_20px] bg-teal-600 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Mengirim…" : "Kirim kenangan"}
      </button>
      <p className="text-xs text-ink-500">Testimoni tampil setelah ditinjau tim Sadewa.</p>
    </form>
  );
}
