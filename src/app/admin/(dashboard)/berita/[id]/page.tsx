import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Berita } from "@/lib/types";
import BeritaForm from "@/components/admin/berita-form";
import DeleteButton from "@/components/admin/delete-button";
import { updateBerita, deleteBerita } from "../actions";

export default async function EditBeritaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("berita").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const initial = data as Berita;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Edit Berita</h1>
        <DeleteButton action={deleteBerita.bind(null, id)} />
      </div>
      <div className="mt-6">
        <BeritaForm initial={initial} action={updateBerita.bind(null, id, initial.published_at)} />
      </div>
    </div>
  );
}
