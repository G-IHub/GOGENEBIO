-- Add an optional logo override and a "program covered" topics list to the
-- certificate template. The logo defaults to the Genomac Holdings logo
-- bundled with the app when logo_url is blank — this column only needs
-- filling in if you ever want to override that.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

alter table public.certificate_template add column if not exists logo_url text;
alter table public.certificate_template add column if not exists topics text[] not null default '{}';
