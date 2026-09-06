# Campaign workspace

Open https://www.deeqafrika.com/admin to sign in. The owner is `deeqafrika@gmail.com`; the password is managed by Supabase Auth and is never stored in source code.

## Connection

Use the **DeeqCampaign** Supabase project (`zsnlaibomuzfiviarhdy`, London / `eu-west-2`). Configure these variables locally in `.env.local` and in the deployment environment:

```
NEXT_PUBLIC_SUPABASE_URL=https://zsnlaibomuzfiviarhdy.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<project publishable key>
SUPABASE_SECRET_KEY=<server-only secret key>
SITE_URL=<public website origin, without a trailing slash>
```

`SITE_URL` is optional; omit it to accept the current request origin, including localhost. Never prefix the secret key with `NEXT_PUBLIC_`. Redeploy after changing environment variables: the publishable key is embedded at build time.

The campaign project has been initialized. For a new installation, apply the SQL migrations in `supabase/migrations/` in timestamp order. It creates content storage, administrator membership, private registrations, a persistent signup rate limiter, and the public `campaign-media` image bucket. All tables have row-level security. Only a campaign administrator may upload images or write content; only published documents are public.

Create the owner in Supabase Authentication with a password, then insert that user's ID into `campaign_admins`. Use the server-only provisioning script with `CAMPAIGN_ADMIN_EMAIL` and `CAMPAIGN_ADMIN_PASSWORD` supplied through your environment. The script refuses to change an existing user's password.

```
node --env-file=.env.local scripts/provision-admin.mjs
```

Add the production `/admin` URL and `http://localhost:3000/admin` to Supabase Authentication → URL Configuration → Redirect URLs. Configure production SMTP before relying on password reset emails. Public account signup can be disabled: supporters register through the campaign form and do not need Auth accounts.

## Editing

- **Pages & images:** select English or Somali, then a page. Edit headings, paragraphs, navigation, shared labels and metadata. The **All page images** group lets you choose photos and adjust their focal point. Gallery and news resource images are editable within their page groups.
- **Save draft:** saves to the database without changing the public website.
- **Publish:** publishes that language's content. Simultaneous saves are protected by revision checks; a stale editor must reload before overwriting a newer version.
- **News & updates:** create a story with paragraphs, headings, photos and YouTube URLs. Reorder blocks with the arrow controls. Both translations must be complete before publication. Preview the current language, save a draft, publish, or unpublish a story. Published stories appear in News, the homepage feed and the sitemap.
- **Donation methods:** enter verified accounts, recipient names and currencies. USDT needs the exact supported network. Enable a method and publish settings to show it. Visitors receive direct-transfer instructions or a payment-page link. The site does not process payments, verify transfers, display donation totals or issue receipts.
- **Supporting entities:** upload the actual organisation logo, enter its name and optional description/website, mark it visible, and publish. No endorsements are invented or shown by default.
- **Registrations:** review signup details and consent timestamps, export all records to CSV, or remove a registration on request. CSV export escapes spreadsheet formula prefixes.

Images uploaded to the media library are public; only upload campaign media intended for public use. Use JPG, PNG, WebP or GIF, up to 8 MB. YouTube embeds load only after a visitor presses Play.

## Validation

```
npm run lint
npm run build:vercel
npm test
```

Production must use HTTPS. The admin validates sessions through Supabase Auth on every API request; browser session state is not authorization. Public supporter registrations are handled only by the server and are rate-limited without retaining raw IP addresses.
