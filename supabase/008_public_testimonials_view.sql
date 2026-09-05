-- Lets the public landing page show real testimonials without granting
-- anonymous visitors full-table SELECT on public.testimonials (which stays
-- admin-only per 002_restrict_read_to_admin.sql). The view omits email.

-- No security_invoker here, deliberately: this view must run as its
-- owner (the migration role), which bypasses the testimonials table's
-- admin-only RLS policy, so the curated columns below can be granted
-- to anon/authenticated without also granting them the base table.
create or replace view public.public_testimonials as
select id, created_at, name, country, region, testimonial
from public.testimonials;

grant select on public.public_testimonials to anon, authenticated;
