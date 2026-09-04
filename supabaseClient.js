import { createClient } from "@supabase/supabase-js";

// Get these from your Supabase project settings → API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase env vars. Copy .env.example to .env and fill in " +
      "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY from your Supabase project settings → API."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
