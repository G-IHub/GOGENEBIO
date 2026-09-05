-- Per-region WhatsApp inbound links.
--
-- Each region has its own Zikorail/WhatsApp inbound link. On the registration
-- form the applicant picks a region; after their registration is saved they are
-- redirected to that region's link.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

-- ============================================================
-- regions
-- ============================================================
create table if not exists public.regions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null unique,
  wa_link text not null,
  active boolean not null default true
);

alter table public.regions enable row level security;

-- The public form reads the active regions to build the dropdown and to know
-- where to redirect. These links are handed out to registrants anyway, so
-- public read access is fine.
create policy "regions_select_public"
  on public.regions
  for select
  to anon, authenticated
  using (true);

-- Only the admin can add / change / remove regions.
create policy "regions_admin_insert"
  on public.regions
  for insert
  to authenticated
  with check ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

create policy "regions_admin_update"
  on public.regions
  for update
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' )
  with check ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

create policy "regions_admin_delete"
  on public.regions
  for delete
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

-- ============================================================
-- registrations.region
-- ============================================================
alter table public.registrations add column if not exists region text;

-- ============================================================
-- Seed regions (optional) -- fill in and uncomment, or add them from the
-- admin dashboard's Regions tab instead.
-- ============================================================
-- insert into public.regions (name, wa_link) values
--   ('Abuja',  'https://app.zikorail.com/go/XXXXXX'),
--   ('Lagos',  'https://app.zikorail.com/go/YYYYYY'),
--   ('Kano',   'https://app.zikorail.com/go/ZZZZZZ')
-- on conflict (name) do nothing;
