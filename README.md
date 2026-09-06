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

## Content and assets

- Bilingual copy: `content/en.ts` and `content/so.ts`
- Shared campaign components: `components/`
- Campaign imagery: `public/images/`
- Vision 2034 download: `public/downloads/rebuild-somali-football-vision-2034.pdf`

The contact form is intentionally lightweight: it prepares a pre-filled email to `campaign@deeqafrika.so`, so it works without collecting or storing supporter data on the site.
