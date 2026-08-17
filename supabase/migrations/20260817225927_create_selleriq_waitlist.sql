create table public.waitlist_signups (
  id bigint generated always as identity primary key,
  email text not null unique,
  cta_location text,
  source text,
  medium text,
  campaign text,
  referrer text,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_valid check (
    char_length(email) between 5 and 254
    and email = lower(btrim(email))
    and email like '%_@_%._%'
  ),
  constraint waitlist_signups_location_valid check (
    cta_location is null or cta_location in ('hero', 'final')
  )
);

create table public.waitlist_qualifications (
  id bigint generated always as identity primary key,
  email text not null references public.waitlist_signups(email) on delete cascade,
  revenue_band text,
  sku_band text,
  primary_pain text,
  marketplaces text[] not null default '{}',
  current_tools text,
  created_at timestamptz not null default now(),
  constraint waitlist_qualifications_email_valid check (
    char_length(email) between 5 and 254
    and email = lower(btrim(email))
  ),
  constraint waitlist_qualifications_marketplaces_valid check (
    cardinality(marketplaces) <= 5
  )
);

create index waitlist_signups_created_at_idx on public.waitlist_signups (created_at desc);
create index waitlist_qualifications_email_idx on public.waitlist_qualifications (email);

alter table public.waitlist_signups enable row level security;
alter table public.waitlist_qualifications enable row level security;

revoke all on table public.waitlist_signups from anon, authenticated;
revoke all on table public.waitlist_qualifications from anon, authenticated;
revoke all on sequence public.waitlist_signups_id_seq from anon, authenticated;
revoke all on sequence public.waitlist_qualifications_id_seq from anon, authenticated;

grant insert (email, cta_location, source, medium, campaign, referrer)
  on table public.waitlist_signups to anon;
grant insert (email, revenue_band, sku_band, primary_pain, marketplaces, current_tools)
  on table public.waitlist_qualifications to anon;
grant usage on sequence public.waitlist_signups_id_seq to anon;
grant usage on sequence public.waitlist_qualifications_id_seq to anon;

grant select, insert, update, delete on table public.waitlist_signups to service_role;
grant select, insert, update, delete on table public.waitlist_qualifications to service_role;
grant usage, select on sequence public.waitlist_signups_id_seq to service_role;
grant usage, select on sequence public.waitlist_qualifications_id_seq to service_role;

create policy "Anonymous visitors can join the waitlist"
  on public.waitlist_signups
  for insert
  to anon
  with check (
    char_length(email) between 5 and 254
    and email = lower(btrim(email))
    and email like '%_@_%._%'
    and (cta_location is null or cta_location in ('hero', 'final'))
  );

create policy "Anonymous visitors can add beta qualification"
  on public.waitlist_qualifications
  for insert
  to anon
  with check (
    char_length(email) between 5 and 254
    and email = lower(btrim(email))
    and cardinality(marketplaces) <= 5
  );
