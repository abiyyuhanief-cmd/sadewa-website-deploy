"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string } | undefined;

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function buildRecord(formData: FormData) {
  const judul = String(formData.get("judul") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const status = String(formData.get("status") ?? "draft") as "draft" | "published";

  return {
    judul,
    slug: slugInput ? slugify(slugInput) : slugify(judul),
    ringkasan: String(formData.get("ringkasan") ?? "").trim() || null,
    konten: String(formData.get("konten") ?? "").trim(),
    gambar_utama_url: String(formData.get("gambar_utama_url") ?? "").trim() || null,
    penulis: String(formData.get("penulis") ?? "").trim() || null,
    status,
  };
}

export async function createBerita(_prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const record = buildRecord(formData);

  if (!record.judul || !record.slug || !record.konten) {
    return { error: "Judul dan isi berita wajib diisi." };
  }

  const { error } = await supabase.from("berita").insert({
    ...record,
    published_at: record.status === "published" ? new Date().toISOString() : null,
  });
  if (error) return { error: error.message };

  revalidatePath("/berita");
  revalidatePath("/admin/berita");
  redirect("/admin/berita");
}

export async function updateBerita(
  id: string,
  currentPublishedAt: string | null,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const record = buildRecord(formData);

  if (!record.judul || !record.slug || !record.konten) {
    return { error: "Judul dan isi berita wajib diisi." };
  }

  const published_at =
    record.status === "published" ? currentPublishedAt ?? new Date().toISOString() : currentPublishedAt;

  const { error } = await supabase.from("berita").update({ ...record, published_at }).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/berita");
  revalidatePath(`/berita/${record.slug}`);
  revalidatePath("/admin/berita");
  redirect("/admin/berita");
}

export async function deleteBerita(id: string) {
  const supabase = await createClient();
  await supabase.from("berita").delete().eq("id", id);
  revalidatePath("/berita");
  revalidatePath("/admin/berita");
  redirect("/admin/berita");
}
