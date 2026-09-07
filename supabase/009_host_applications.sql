-- Applications from people/organisations who want to HOST a Global Outreach
-- program in their region (distinct from participant registrations).
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

create table if not exists public.host_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  organisation text,
  country text not null,
  city text,
  role text,
  program text,
  cohort_size text,
  motivation text
);

alter table public.host_applications enable row level security;

-- Anyone can submit the host application form.
create policy "host_applications_insert_anon"
  on public.host_applications
  for insert
  to anon, authenticated
  with check (true);

-- Only the admin can read them.
create policy "host_applications_select_admin"
  on public.host_applications
  for select
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );
