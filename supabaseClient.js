import { createClient } from "@supabase/supabase-js";

// Get these from your Supabase project settings → API.
// Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env locally and in the
// Vercel project's Environment Variables (Production + Preview).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("[supabase] build-time env check", {
    hasUrl: Boolean(supabaseUrl),
    hasKey: Boolean(supabaseKey),
    viteKeys: Object.keys(import.meta.env).filter((k) => k.startsWith("VITE_")),
  });
  throw new Error(
    "Missing Supabase env vars [build 3]. Set VITE_SUPABASE_URL and " +
      "VITE_SUPABASE_ANON_KEY in the Vercel project's Environment Variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
