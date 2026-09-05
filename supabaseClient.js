import { createClient } from "@supabase/supabase-js";

// Supabase project settings → API.
// Values come from .env.production (committed — the URL and publishable key are
// public-safe and Vite inlines them into the browser bundle either way) or from
// a local .env during development. See .env.example.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase env vars: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
