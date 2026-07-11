"use client";

import { useActionState } from "react";
import Image from "next/image";
import { login, type LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, undefined);

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
        <h1 className="font-display text-2xl font-semibold text-ink-900">Admin Panel</h1>
        <p className="mt-1 text-sm text-ink-600">Masuk untuk mengelola Cerita GUIM &amp; Berita.</p>

        <form action={action} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink-800">
              Kata sandi
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
            />
          </div>

          {state?.error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </section>
  );
}
