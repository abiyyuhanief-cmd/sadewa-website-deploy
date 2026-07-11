"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  arrayToComma,
  commaToArray,
  linesToArray,
  linesToTitik,
  toNullableInt,
} from "@/lib/admin-form-utils";

export type FormState = { error?: string } | undefined;

function buildRecord(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    angkatan: toNullableInt(formData.get("angkatan")),
    nama_angkatan: String(formData.get("nama_angkatan") ?? "").trim(),
    kabupaten: String(formData.get("kabupaten") ?? "").trim(),
    provinsi: String(formData.get("provinsi") ?? "").trim(),
    tahun_pelaksanaan: String(formData.get("tahun_pelaksanaan") ?? "").trim(),
    tema: String(formData.get("tema") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim() || null,
    nilai: commaToArray(formData.get("nilai")),
    gambaran_umum: String(formData.get("gambaran_umum") ?? "").trim(),
    latar_belakang: String(formData.get("latar_belakang") ?? "").trim() || null,
    timeline_pra_aksi: linesToArray(formData.get("timeline_pra_aksi")),
    timeline_aksi: linesToArray(formData.get("timeline_aksi")),
    timeline_pasca_aksi: linesToArray(formData.get("timeline_pasca_aksi")),
    titik_pelaksanaan: linesToTitik(formData.get("titik_pelaksanaan")),
    inovasi: linesToArray(formData.get("inovasi")),
    pembaharuan: linesToArray(formData.get("pembaharuan")),
    evaluasi_lesson_learned: linesToArray(formData.get("evaluasi_lesson_learned")),
    jumlah_panitia: toNullableInt(formData.get("jumlah_panitia")),
    jumlah_pengajar: toNullableInt(formData.get("jumlah_pengajar")),
    jumlah_siswa: toNullableInt(formData.get("jumlah_siswa")),
    jumlah_guru: toNullableInt(formData.get("jumlah_guru")),
    jumlah_sd: toNullableInt(formData.get("jumlah_sd")),
    jumlah_desa: toNullableInt(formData.get("jumlah_desa")),
    jumlah_kecamatan: toNullableInt(formData.get("jumlah_kecamatan")),
    status: String(formData.get("status") ?? "draft"),
  };
}

export { arrayToComma };

export async function createGuimStory(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const record = buildRecord(formData);

  if (!record.slug || !record.nama_angkatan || !record.angkatan) {
    return { error: "Slug, nama angkatan, dan nomor angkatan wajib diisi." };
  }

  const { error } = await supabase.from("guim_story").insert(record);
  if (error) return { error: error.message };

  revalidatePath("/cerita-guim");
  revalidatePath("/admin/cerita-guim");
  redirect("/admin/cerita-guim");
}

export async function updateGuimStory(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const record = buildRecord(formData);

  if (!record.slug || !record.nama_angkatan || !record.angkatan) {
    return { error: "Slug, nama angkatan, dan nomor angkatan wajib diisi." };
  }

  const { error } = await supabase.from("guim_story").update(record).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/cerita-guim");
  revalidatePath(`/cerita-guim/${record.slug}`);
  revalidatePath("/admin/cerita-guim");
  redirect("/admin/cerita-guim");
}

export async function deleteGuimStory(id: string) {
  const supabase = await createClient();
  await supabase.from("guim_story").delete().eq("id", id);
  revalidatePath("/cerita-guim");
  revalidatePath("/admin/cerita-guim");
  redirect("/admin/cerita-guim");
}
