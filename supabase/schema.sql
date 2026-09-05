-- GoGeneBio backend schema
-- Run this once in: Supabase Dashboard → SQL Editor → New query → Run

-- ============================================================
-- registrations
-- ============================================================
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text not null,
  region text,
  heard_before text,
  experience text
  -- Registration is intentionally open: the same person may register more than
  -- once, so email/phone are not unique.
);

alter table public.registrations enable row level security;

-- Normalize email so "John@x.com" and "john@x.com" match in registration_exists()
-- below (which the certificate page uses) and in the admin search.
create or replace function public.normalize_registration_email()
returns trigger
language plpgsql
as $$
begin
  new.email := lower(trim(new.email));
  return new;
end;
$$;

drop trigger if exists trg_normalize_registration_email on public.registrations;
create trigger trg_normalize_registration_email
  before insert or update on public.registrations
  for each row execute function public.normalize_registration_email();

-- Anyone (including anonymous visitors) can submit the registration form.
create policy "registrations_insert_anon"
  on public.registrations
  for insert
  to anon, authenticated
  with check (true);

-- Only the admin email can read the list. Change/add emails here (and in the
-- testimonials policy below) to grant dashboard access to more people.
create policy "registrations_select_admin"
  on public.registrations
  for select
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

-- ============================================================
-- testimonials
-- ============================================================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  country text,
  region text,
  testimonial text not null
);

alter table public.testimonials enable row level security;

create policy "testimonials_insert_anon"
  on public.testimonials
  for insert
  to anon, authenticated
  with check (true);

create policy "testimonials_select_admin"
  on public.testimonials
  for select
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

-- ============================================================
-- registration_exists(check_email)
-- Lets the public Auth/certificate page check whether an email
-- registered, WITHOUT exposing any row data to anonymous callers.
-- ============================================================
create or replace function public.registration_exists(check_email text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.registrations
    where email = lower(trim(check_email))
  );
$$;

-- Allow anyone to call the function (it only ever returns true/false).
grant execute on function public.registration_exists(text) to anon, authenticated;

-- ============================================================
-- regions  (per-region WhatsApp inbound links; see 003_regions.sql)
-- ============================================================
create table if not exists public.regions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null unique,
  wa_link text not null,
  active boolean not null default true
);

alter table public.regions enable row level security;

create policy "regions_select_public"
  on public.regions
  for select
  to anon, authenticated
  using (true);

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
