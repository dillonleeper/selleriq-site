# SellerIQ marketing site

## Vercel environment variables

Configure these for Preview and Production in Vercel. None should be committed.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SUPABASE_URL` | Yes | Supabase project URL used only by the server-side waitlist route. |
| `SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase publishable key. The `waitlist_signups` table must allow anonymous inserts through a narrow RLS policy. Never use the service-role key here. |
| `RESEND_API_KEY` | No | Sends signup notifications. If absent or delivery fails, signup still succeeds. |
| `WAITLIST_EMAIL_FROM` | No | Verified Resend sender, for example `SellerIQ <hello@selleriq.com>`. Defaults to Resend's test sender. |
| `WAITLIST_NOTIFICATION_TO` | No | Notification recipient. Defaults to `leeperdillon@gmail.com`. |

The `waitlist_signups` table must have a unique constraint on `email` so repeated submissions remain idempotent. Because Supabase no longer exposes new tables automatically, grant only `INSERT` to `anon`, enable RLS, and add an insert-only policy for this table. Do not grant anonymous `SELECT`, `UPDATE`, or `DELETE` access.

```sql
grant insert on table public.waitlist_signups to anon;
alter table public.waitlist_signups enable row level security;
create policy "public can join waitlist"
on public.waitlist_signups for insert to anon
with check (
  char_length(email) between 5 and 254
  and email = lower(btrim(email))
  and email like '%_@_%._%'
  and (cta_location is null or cta_location in ('hero', 'final'))
);
```

Email delivery is deliberately best-effort and is scheduled only after a successful Supabase insert.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
