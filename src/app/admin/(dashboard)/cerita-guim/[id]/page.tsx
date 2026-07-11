import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { GuimStory } from "@/lib/types";
import GuimStoryForm from "@/components/admin/guim-story-form";
import DeleteButton from "@/components/admin/delete-button";
import { updateGuimStory, deleteGuimStory } from "../actions";

export default async function EditGuimStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("guim_story").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const initial = data as GuimStory;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink-900">Edit {initial.nama_angkatan}</h1>
        <DeleteButton action={deleteGuimStory.bind(null, id)} />
      </div>
      <div className="mt-6 max-w-3xl">
        <GuimStoryForm initial={initial} action={updateGuimStory.bind(null, id)} />
      </div>
    </div>
  );
}
