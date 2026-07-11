import BeritaForm from "@/components/admin/berita-form";
import { createBerita } from "../actions";

export default function NewBeritaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Tulis Berita</h1>
      <div className="mt-6">
        <BeritaForm action={createBerita} />
      </div>
    </div>
  );
}
