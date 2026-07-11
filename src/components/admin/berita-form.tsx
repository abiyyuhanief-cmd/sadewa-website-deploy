"use client";

import { useActionState } from "react";
import type { Berita } from "@/lib/types";
import type { FormState } from "@/app/admin/(dashboard)/berita/actions";
import ImageUpload from "./image-upload";
import TiptapEditor from "./tiptap-editor";

export default function BeritaForm({
  initial,
  action,
}: {
  initial?: Berita;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <div>
        <label htmlFor="judul" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Judul
        </label>
        <input
          id="judul"
          name="judul"
          required
          defaultValue={initial?.judul}
          className="w-full rounded-lg border border-ink-200 bg-paper-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Slug (URL) <span className="font-normal text-ink-500">— kosongkan untuk otomatis dari judul</span>
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={initial?.slug}
            className="w-full rounded-lg border border-ink-200 bg-paper-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
        <div>
          <label htmlFor="penulis" className="mb-1.5 block text-sm font-semibold text-ink-800">
            Penulis (opsional)
          </label>
          <input
            id="penulis"
            name="penulis"
            defaultValue={initial?.penulis ?? ""}
            className="w-full rounded-lg border border-ink-200 bg-paper-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="ringkasan" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Ringkasan (opsional)
        </label>
        <textarea
          id="ringkasan"
          name="ringkasan"
          rows={2}
          defaultValue={initial?.ringkasan ?? ""}
          className="w-full rounded-lg border border-ink-200 bg-paper-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
        />
      </div>

      <ImageUpload name="gambar_utama_url" label="Gambar Utama" defaultValue={initial?.gambar_utama_url} />

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink-800">Isi Berita</label>
        <TiptapEditor name="konten" defaultValue={initial?.konten} />
      </div>

      <div className="max-w-xs">
        <label htmlFor="status" className="mb-1.5 block text-sm font-semibold text-ink-800">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={initial?.status ?? "draft"}
          className="w-full rounded-lg border border-ink-200 bg-paper-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {state?.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
