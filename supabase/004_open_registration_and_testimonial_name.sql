-- 1. Open registration: allow the same person to register more than once by
--    dropping the email/phone uniqueness constraints.
-- 2. Give testimonials a name field for the standalone testimonial form.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

alter table public.registrations
  drop constraint if exists registrations_email_unique;

alter table public.registrations
  drop constraint if exists registrations_phone_unique;

alter table public.testimonials
  add column if not exists name text;
