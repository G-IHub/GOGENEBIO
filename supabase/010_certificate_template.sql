-- Certificate template: one admin-managed row that the testimonial page
-- renders into a downloadable certificate, with the submitter's name filled
-- in. Includes a public Storage bucket for the background + signature images.
--
-- Run in: Supabase Dashboard -> SQL Editor -> New query -> Run

create table if not exists public.certificate_template (
  id text primary key default 'default',
  title text,
  program_name text,
  body_text text,
  background_url text,
  signatory1_name text,
  signatory1_title text,
  signatory1_signature_url text,
  signatory2_name text,
  signatory2_title text,
  signatory2_signature_url text,
  updated_at timestamptz not null default now()
);

alter table public.certificate_template enable row level security;

-- The testimonial page (anonymous visitors) needs to read the template to
-- render the certificate right after someone submits.
create policy "certificate_template_select_public"
  on public.certificate_template
  for select
  to anon, authenticated
  using (true);

create policy "certificate_template_admin_write"
  on public.certificate_template
  for all
  to authenticated
  using ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' )
  with check ( lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com' );

insert into public.certificate_template (id, title, program_name, body_text)
values (
  'default',
  'Certificate of Participation',
  'GoGeneBio Global Outreach',
  'has successfully participated in the {program} program organized by Genomac Holdings.'
)
on conflict (id) do nothing;

-- ============================================================
-- Storage bucket for certificate assets (public read; admin-only write)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', true)
on conflict (id) do nothing;

create policy "certificates_storage_admin_insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'certificates'
    and lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com'
  );

create policy "certificates_storage_admin_update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'certificates'
    and lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com'
  );

create policy "certificates_storage_admin_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'certificates'
    and lower(auth.jwt() ->> 'email') = 'genomachub@gmail.com'
  );
