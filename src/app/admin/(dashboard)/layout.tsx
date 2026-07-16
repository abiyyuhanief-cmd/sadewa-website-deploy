import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");
  if (user.user_metadata?.password_set === false) redirect("/admin/set-password");

  return (
    <div className="min-h-[70vh] bg-paper-100">
      <header className="border-b border-paper-200 bg-paper-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2">
              <Image src="/brand/logo-icon.png" alt="Sadewa" width={28} height={22} className="h-6 w-auto" />
              <span className="font-display text-base font-semibold text-ink-900">Admin</span>
            </Link>
            <nav className="hidden items-center gap-5 sm:flex">
              <Link href="/admin/cerita-guim" className="text-sm font-semibold text-ink-700 hover:text-teal-700">
                GUIM Story
              </Link>
              <Link href="/admin/cerita" className="text-sm font-semibold text-ink-700 hover:text-teal-700">
                Cerita
              </Link>
              <Link href="/admin/testimoni" className="text-sm font-semibold text-ink-700 hover:text-teal-700">
                Testimoni
              </Link>
              <Link href="/admin/leads" className="text-sm font-semibold text-ink-700 hover:text-teal-700">
                Leads
              </Link>
              <Link href="/admin/users" className="text-sm font-semibold text-ink-700 hover:text-teal-700">
                Users
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-ink-500 sm:inline">{user.email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-ink-200 px-4 py-2 text-xs font-semibold text-ink-700 hover:bg-paper-100"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
        <nav className="flex items-center gap-5 overflow-x-auto border-t border-paper-200 px-6 py-3 sm:hidden">
          <Link href="/admin/cerita-guim" className="whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-teal-700">
            GUIM Story
          </Link>
          <Link href="/admin/cerita" className="whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-teal-700">
            Cerita
          </Link>
          <Link href="/admin/testimoni" className="whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-teal-700">
            Testimoni
          </Link>
          <Link href="/admin/leads" className="whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-teal-700">
            Leads
          </Link>
          <Link href="/admin/users" className="whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-teal-700">
            Users
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
