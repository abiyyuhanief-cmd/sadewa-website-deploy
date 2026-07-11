"use client";

import { useActionState } from "react";
import type { GuimStory } from "@/lib/types";
import { arrayToLines, arrayToComma, titikToLines } from "@/lib/admin-form-utils";
import type { FormState } from "@/app/admin/(dashboard)/cerita-guim/actions";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border border-ink-200 bg-paper-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  hint,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  hint?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
      </label>
      {hint && <p className="mb-1.5 text-xs text-ink-500">{hint}</p>}
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-ink-200 bg-paper-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
      />
    </div>
  );
}

export default function GuimStoryForm({
  initial,
  action,
}: {
  initial?: GuimStory;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug (URL)" name="slug" defaultValue={initial?.slug} required />
        <Field label="Nomor Angkatan" name="angkatan" type="number" defaultValue={initial?.angkatan} required />
        <Field label="Nama Angkatan" name="nama_angkatan" defaultValue={initial?.nama_angkatan} required />
        <div>
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
        <Field label="Kabupaten" name="kabupaten" defaultValue={initial?.kabupaten} required />
        <Field label="Provinsi" name="provinsi" defaultValue={initial?.provinsi} required />
        <Field label="Tahun Pelaksanaan" name="tahun_pelaksanaan" defaultValue={initial?.tahun_pelaksanaan} required />
        <Field label="Tagline (opsional)" name="tagline" defaultValue={initial?.tagline} />
      </div>

      <TextArea label="Tema" name="tema" defaultValue={initial?.tema} rows={2} />
      <Field
        label="Nilai-nilai (opsional, pisahkan dengan koma)"
        name="nilai"
        defaultValue={arrayToComma(initial?.nilai ?? null)}
      />

      <TextArea label="Gambaran Umum" name="gambaran_umum" defaultValue={initial?.gambaran_umum} rows={6} />
      <TextArea label="Latar Belakang (opsional)" name="latar_belakang" defaultValue={initial?.latar_belakang ?? ""} rows={4} />

      <div className="grid gap-4 sm:grid-cols-3">
        <TextArea
          label="Timeline Pra Aksi"
          name="timeline_pra_aksi"
          hint="Satu poin per baris"
          defaultValue={arrayToLines(initial?.timeline_pra_aksi ?? null)}
        />
        <TextArea
          label="Timeline Aksi"
          name="timeline_aksi"
          hint="Satu poin per baris"
          defaultValue={arrayToLines(initial?.timeline_aksi ?? null)}
        />
        <TextArea
          label="Timeline Pasca Aksi"
          name="timeline_pasca_aksi"
          hint="Satu poin per baris"
          defaultValue={arrayToLines(initial?.timeline_pasca_aksi ?? null)}
        />
      </div>

      <TextArea
        label="Titik Pelaksanaan"
        name="titik_pelaksanaan"
        hint="Satu titik per baris, format: Nama SD | Desa | Kecamatan (desa/kecamatan opsional)"
        defaultValue={titikToLines(initial?.titik_pelaksanaan ?? [])}
        rows={5}
      />

      <TextArea
        label="Inovasi (opsional)"
        name="inovasi"
        hint="Satu poin per baris"
        defaultValue={arrayToLines(initial?.inovasi ?? null)}
      />
      <TextArea
        label="Pembaharuan (opsional)"
        name="pembaharuan"
        hint="Satu poin per baris"
        defaultValue={arrayToLines(initial?.pembaharuan ?? null)}
      />
      <TextArea
        label="Evaluasi & Lesson Learned (opsional)"
        name="evaluasi_lesson_learned"
        hint="Satu poin per baris"
        defaultValue={arrayToLines(initial?.evaluasi_lesson_learned ?? null)}
      />

      <div>
        <p className="mb-2 text-sm font-semibold text-ink-800">GUIM in Data (kosongkan jika tidak diketahui)</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Field label="Panitia" name="jumlah_panitia" type="number" defaultValue={initial?.jumlah_panitia} />
          <Field label="Pengajar" name="jumlah_pengajar" type="number" defaultValue={initial?.jumlah_pengajar} />
          <Field label="Siswa" name="jumlah_siswa" type="number" defaultValue={initial?.jumlah_siswa} />
          <Field label="Guru" name="jumlah_guru" type="number" defaultValue={initial?.jumlah_guru} />
          <Field label="SD" name="jumlah_sd" type="number" defaultValue={initial?.jumlah_sd} />
          <Field label="Desa" name="jumlah_desa" type="number" defaultValue={initial?.jumlah_desa} />
          <Field label="Kecamatan" name="jumlah_kecamatan" type="number" defaultValue={initial?.jumlah_kecamatan} />
        </div>
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
