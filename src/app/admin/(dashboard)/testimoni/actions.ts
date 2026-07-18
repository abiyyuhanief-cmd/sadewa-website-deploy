"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function revalidateFor(slug: string) {
  revalidatePath("/admin/testimoni");
  revalidatePath(`/cerita-guim/${slug}`);
}

export async function approveTestimoni(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const supabase = await createClient();
  await supabase.from("guim_testimoni").update({ status: "published" }).eq("id", id);
  await revalidateFor(slug);
}

export async function unpublishTestimoni(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const supabase = await createClient();
  await supabase.from("guim_testimoni").update({ status: "pending" }).eq("id", id);
  await revalidateFor(slug);
}

export async function deleteTestimoni(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const supabase = await createClient();
  await supabase.from("guim_testimoni").delete().eq("id", id);
  await revalidateFor(slug);
}
