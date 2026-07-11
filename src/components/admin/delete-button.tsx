"use client";

export default function DeleteButton({
  action,
  confirmMessage = "Yakin ingin menghapus data ini? Aksi ini tidak bisa dibatalkan.",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        Hapus
      </button>
    </form>
  );
}
