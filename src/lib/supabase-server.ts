import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is required.");
}

const apiKey = serviceRoleKey || anonKey;
if (!apiKey) {
  throw new Error(
    "Missing Supabase API key. Set SUPABASE_SERVICE_ROLE_KEY (preferred) or NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabaseServer = createClient(supabaseUrl, apiKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
