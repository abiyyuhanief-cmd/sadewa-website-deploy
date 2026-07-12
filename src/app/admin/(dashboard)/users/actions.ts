"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export type InviteState = { error?: string; success?: string } | undefined;

export async function inviteUser(_prevState: InviteState, formData: FormData): Promise<InviteState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Email wajib diisi." };
  }

  // Read at runtime (SITE_URL is not NEXT_PUBLIC, so it is not inlined at build time).
  // Canonical host is www — the apex redirects to www, so target www directly to avoid
  // an extra redirect hop that can drop the auth token fragment.
  const siteUrl = (process.env.SITE_URL ?? "https://www.sadewaind.org").replace(/\/$/, "");

  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${siteUrl}/admin/set-password`,
    data: { password_set: false },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: `Undangan terkirim ke ${email}.` };
}
