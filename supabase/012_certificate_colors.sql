-- Admin-editable certificate colours (border, program name, participant
-- name, topic bullets). Both default to the current brand colours when
-- blank, so existing certificates are unaffected until an admin picks
-- something different.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

alter table public.certificate_template add column if not exists accent_color text;
alter table public.certificate_template add column if not exists accent_color_2 text;
