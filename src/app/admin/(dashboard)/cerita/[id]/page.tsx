import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Cerita } from "@/lib/types";
import CeritaForm from "@/components/admin/cerita-form";
import DeleteButton from "@/components/admin/delete-button";
import { updateCerita, deleteCerita } from "../actions";

export default async function EditCeritaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("cerita").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const initial = data as Cerita;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Edit Cerita</h1>
        <DeleteButton action={deleteCerita.bind(null, id)} />
      </div>
      <div className="mt-6">
        <CeritaForm initial={initial} action={updateCerita.bind(null, id, initial.published_at)} />
      </div>
    </div>
  );
}
