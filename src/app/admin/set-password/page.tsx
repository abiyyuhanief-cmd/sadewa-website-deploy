"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function SetPasswordPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(Boolean(session));
      setChecking(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(Boolean(session));
      setChecking(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!checking && !hasSession) {
      router.replace("/admin/login");
    }
  }, [checking, hasSession, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setPending(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: { password_set: true },
    });
    setPending(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  if (checking || !hasSession) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-paper-100 px-6 py-16">
        <p className="text-sm text-ink-600">Memeriksa sesi...</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-paper-100 px-6 py-16">
      <div className="w-full max-w-sm rounded-[4px_24px_4px_24px] border border-paper-200 bg-paper-white p-8">
        <Image
          src="/brand/logo-icon.png"
          alt="Sadewa"
          width={40}
          height={32}
          className="mb-6 h-9 w-auto"
        />
        <h1 className="font-display text-2xl font-semibold text-ink-900">Atur Kata Sandi</h1>
        <p className="mt-1 text-sm text-ink-600">Buat kata sandi baru untuk akun admin Anda.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink-800">
              Kata sandi baru
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
          <div>
            <label
              htmlFor="confirm_password"
              className="mb-1.5 block text-sm font-semibold text-ink-800"
            >
              Konfirmasi kata sandi
            </label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Menyimpan..." : "Simpan kata sandi"}
          </button>
        </form>
      </div>
    </section>
  );
}
