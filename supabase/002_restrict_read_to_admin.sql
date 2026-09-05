-- Restrict table reads to a specific admin email.
--
-- Before this, any authenticated user could read every registration and
-- testimonial. Now only the admin listed below can, so it no longer matters
-- whether public sign-ups are enabled.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- To change/add admins later, edit the email(s) in BOTH policies and re-run.

-- ============================================================
-- registrations
-- ============================================================
drop policy if exists "registrations_select_authenticated" on public.registrations;

create policy "registrations_select_admin"
  on public.registrations
  for select
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

-- ============================================================
-- testimonials
-- ============================================================
drop policy if exists "testimonials_select_authenticated" on public.testimonials;

create policy "testimonials_select_admin"
  on public.testimonials
  for select
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

-- Note: the public registration form (anon INSERT) and the
-- registration_exists() RPC are unchanged and keep working.
