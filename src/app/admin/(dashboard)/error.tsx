"use client";

export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isStaleAction = /Server Action .* was not found/i.test(error.message);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-center">
      <h1 className="font-display text-xl font-semibold text-ink-900">
        {isStaleAction ? "Halaman perlu dimuat ulang" : "Terjadi kesalahan"}
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        {isStaleAction
          ? "Aplikasi sudah diperbarui sejak halaman ini dibuka, jadi aksi lama sudah tidak dikenali server. Muat ulang halaman untuk melanjutkan."
          : error.message || "Terjadi kesalahan yang tidak terduga."}
      </p>
      <button
        type="button"
        onClick={() => (isStaleAction ? window.location.reload() : reset())}
        className="mt-6 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
      >
        Muat ulang
      </button>
    </div>
  );
}
