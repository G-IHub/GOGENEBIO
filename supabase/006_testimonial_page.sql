-- Testimonial page extras:
--   1. app_settings: key/value config. Used here for the URL a user is sent to
--      after submitting a testimonial (certificate page, offers, etc.).
--   2. promos: program/offer cards shown alongside the testimonial form. Admin
--      uploads an image + caption + link.
--   3. a public Storage bucket for the promo images.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

-- ============================================================
-- app_settings
-- ============================================================
create table if not exists public.app_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

alter table public.app_settings enable row level security;

create policy "app_settings_select_public"
  on public.app_settings
  for select
  to anon, authenticated
  using (true);

create policy "app_settings_admin_write"
  on public.app_settings
  for all
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' )
  with check ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

insert into public.app_settings (key, value)
values ('testimonial_redirect_url', '')
on conflict (key) do nothing;

-- ============================================================
-- promos
-- ============================================================
create table if not exists public.promos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  image_url text,
  caption text not null,
  link text not null,
  active boolean not null default true,
  sort_order int not null default 0
);

alter table public.promos enable row level security;

create policy "promos_select_public"
  on public.promos
  for select
  to anon, authenticated
  using (true);

create policy "promos_admin_insert"
  on public.promos
  for insert
  to authenticated
  with check ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

create policy "promos_admin_update"
  on public.promos
  for update
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' )
  with check ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

create policy "promos_admin_delete"
  on public.promos
  for delete
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

-- ============================================================
-- Storage bucket for promo images (public read; admin-only write)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('promos', 'promos', true)
on conflict (id) do nothing;

create policy "promos_storage_admin_insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'promos'
    and lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com'
  );

create policy "promos_storage_admin_update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'promos'
    and lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com'
  );

create policy "promos_storage_admin_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'promos'
    and lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com'
  );
