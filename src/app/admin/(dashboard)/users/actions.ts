"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export type InviteState = { error?: string; success?: string } | undefined;

export async function inviteUser(_prevState: InviteState, formData: FormData): Promise<InviteState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Email wajib diisi." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sadewaind.org";

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
