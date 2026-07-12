import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";

// Admin-only — pakai cookie-auth client (RLS "leads_admin_select", authenticated saja).
export async function getLeadsListing(): Promise<Lead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Lead[];
}
