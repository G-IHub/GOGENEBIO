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
  heard_before text,
  experience text,
  constraint registrations_email_unique unique (email),
  constraint registrations_phone_unique unique (phone)
);

alter table public.registrations enable row level security;

-- Normalize email so "John@x.com" and "john@x.com" are treated as the same
-- registrant (the unique constraint above and registration_exists() below
-- both depend on emails being stored lowercase/trimmed).
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

-- Only signed-in admins can read the list.
create policy "registrations_select_authenticated"
  on public.registrations
  for select
  to authenticated
  using (true);

-- ============================================================
-- testimonials
-- ============================================================
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  testimonial text not null
);

alter table public.testimonials enable row level security;

create policy "testimonials_insert_anon"
  on public.testimonials
  for insert
  to anon, authenticated
  with check (true);

create policy "testimonials_select_authenticated"
  on public.testimonials
  for select
  to authenticated
  using (true);

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
