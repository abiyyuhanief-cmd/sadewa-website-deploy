import GuimStoryForm from "@/components/admin/guim-story-form";
import { createGuimStory } from "../actions";

export default function NewGuimStoryPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Tambah Angkatan GUIM</h1>
      <div className="mt-6 max-w-3xl">
        <GuimStoryForm action={createGuimStory} />
      </div>
    </div>
  );
}
