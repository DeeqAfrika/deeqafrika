# Deeq M Afrika — Rebuild Somali Football

Bilingual Somali/English campaign website for Deeq M Afrika's Somali Football Federation presidential campaign and Vision 2034 programme.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The English site lives at `/en` and the Somali site at `/so`.

## Production checks

```bash
npm run lint
npm test
```

`npm test` creates a production build and checks the rendered campaign routes, language metadata, and removal of starter preview content.

## Deployment targets

- `npm run build` produces the Sites/Vinext release.
- `npm run build:vercel` produces the standard Next.js release used by Vercel.
- `vercel.json` selects the Next.js build automatically for Git-based Vercel deployments.

## Content and assets

- Bilingual copy: `content/en.ts` and `content/so.ts`
- Shared campaign components: `components/`
- Campaign imagery: `public/images/`
- Vision 2034 download: `public/downloads/rebuild-somali-football-vision-2034.pdf`

The `/admin` workspace manages bilingual pages, images, news with YouTube videos, donation receiving details, supporting-entity logos and private campaign registrations. See [the admin setup guide](docs/ADMIN_SETUP.md) for environment variables, database setup and publishing. Supporter registrations are stored in Supabase; donations use administrator-configured direct-transfer instructions.
