import CeritaForm from "@/components/admin/cerita-form";
import { createCerita } from "../actions";

export default function NewCeritaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">Tulis Cerita</h1>
      <div className="mt-6">
        <CeritaForm action={createCerita} />
      </div>
    </div>
  );
}
