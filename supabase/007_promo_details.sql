-- Richer promo cards: a longer description and a list of benefit bullet points.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

alter table public.promos add column if not exists description text;
alter table public.promos add column if not exists benefits text[] not null default '{}';
