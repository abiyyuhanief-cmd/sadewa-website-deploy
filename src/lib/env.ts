// Production build (Vercel Production environment) pakai kredensial *_PROD;
// selain itu (Preview/local dev) pakai kredensial tanpa suffix.
// Ditentukan oleh NEXT_PUBLIC_APP_ENV, bukan VERCEL_ENV bawaan, supaya eksplisit
// dan bisa dicek langsung dari daftar env var di dashboard.
const isProd = process.env.NEXT_PUBLIC_APP_ENV === "production";

export const SUPABASE_URL = isProd
  ? process.env.NEXT_PUBLIC_SUPABASE_URL_PROD ?? ""
  : process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export const SUPABASE_ANON_KEY = isProd
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD ?? ""
  : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const SUPABASE_SERVICE_ROLE_KEY = isProd
  ? process.env.SUPABASE_SERVICE_ROLE_KEY_PROD ?? ""
  : process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
