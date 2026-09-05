-- Add email / country / region to testimonials (for the standalone form).
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

alter table public.testimonials add column if not exists email text;
alter table public.testimonials add column if not exists country text;
alter table public.testimonials add column if not exists region text;
