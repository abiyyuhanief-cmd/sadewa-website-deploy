"use client";

import { useActionState } from "react";
import { inviteUser, type InviteState } from "./actions";

export default function AdminUsersPage() {
  const [state, action, pending] = useActionState<InviteState, FormData>(inviteUser, undefined);

  return (
    <div className="max-w-md">
      <h1 className="font-display text-2xl font-semibold text-ink-900">Undang Admin</h1>
      <p className="mt-1 text-sm text-ink-600">
        Kirim undangan email untuk akses panel admin. Penerima akan diminta mengatur kata sandi
        sendiri.
      </p>

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
            autoComplete="off"
            className="w-full rounded-lg border border-ink-200 bg-paper-white px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
          />
        </div>

        {state?.error && (
          <p role="alert" className="text-sm font-medium text-red-600">
            {state.error}
          </p>
        )}
        {state?.success && (
          <p role="status" className="text-sm font-medium text-teal-700">
            {state.success}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-paper-50 transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Mengirim..." : "Kirim undangan"}
        </button>
      </form>
    </div>
  );
}
