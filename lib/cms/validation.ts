import { z } from 'zod';
import { content } from '@/content';
import type { CampaignContent, Language } from '@/content';

export function safeLink(value: string): boolean {
  if (value === '') return true;
  if (/^\/(?!\/)[^\\\s]*$/.test(value)) return true;
  try { const url = new URL(value); return ['https:', 'mailto:', 'tel:'].includes(url.protocol) && !url.username && !url.password; } catch { return false; }
}
export function safeImage(value: string): boolean {
  if (/^\/images\/[a-zA-Z0-9_./-]+\.(png|jpe?g|webp|gif)$/i.test(value) && !value.includes('..')) return true;
  try {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const url = new URL(value);
    return Boolean(base && url.origin === new URL(base).origin && url.pathname.startsWith('/storage/v1/object/public/campaign-media/') && !url.search && !url.hash && !url.username && !url.password);
  } catch { return false; }
}
export function youtubeId(input: string): string | null {
  try {
    const url = new URL(input);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
    let id: string | null = null;
    if (url.hostname === 'youtu.be') id = url.pathname.split('/')[1];
    if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'].includes(url.hostname)) {
      id = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(embed|shorts|live)\//.test(url.pathname) ? url.pathname.split('/')[2] : null;
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}
const text = z.string().max(20000);
const short = z.string().max(300);
const image = z.string().max(2000).refine(v => v === '' || safeImage(v), 'Choose a campaign image or upload one to the media library.');
const link = z.string().max(2000).refine(safeLink, 'Use an internal path or a valid HTTPS link.');
const position = z.string().regex(/^(?:center|left|right|\d{1,3}(?:\.\d+)?%)(?: (?:center|top|bottom|\d{1,3}(?:\.\d+)?%))?$/, 'Use an image position such as 50% 30%.');
const bilingual = z.object({ en: text, so: text }).strict();
const block = z.object({ id: short, type: z.enum(['paragraph', 'heading', 'image', 'youtube']), text, src: z.string().max(2000), alt: short, caption: text }).strict().superRefine((b, ctx) => {
  if (b.type === 'image' && b.src && !safeImage(b.src)) ctx.addIssue({ code: 'custom', message: 'Choose a campaign image.', path: ['src'] });
  if (b.type === 'youtube' && b.src && !youtubeId(b.src)) ctx.addIssue({ code: 'custom', message: 'Use a valid YouTube video URL.', path: ['src'] });
});
const translation = z.object({ title: short, excerpt: z.string().max(1500), category: short, coverAlt: short, blocks: z.array(block).max(100) }).strict();
export const postSchema = z.object({ slug: z.string().max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a URL slug with lowercase letters, numbers and hyphens.'), coverImage: image, coverPosition: position, publishedAt: z.string().datetime(), translations: z.object({ en: translation, so: translation }).strict() }).strict();
export const settingsSchema = z.object({
  donationMethods: z.array(z.object({ id: short, name: short, kind: z.enum(['mobile', 'crypto', 'link']), enabled: z.boolean(), account: z.string().max(250), recipient: short, network: short, currency: short, url: link, instructions: bilingual }).strict()).max(30),
  supporters: z.array(z.object({ id: short, name: short, logo: image, url: link, visible: z.boolean(), description: bilingual }).strict()).max(100),
}).strict();
export const signupSchema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(254).transform(v => v.toLowerCase()), phone: z.string().trim().max(40), region: z.string().trim().min(2).max(120), role: z.string().trim().min(1).max(120), message: z.string().trim().max(3000), locale: z.enum(['en', 'so']), consent: z.literal(true), website: z.string().max(200).optional() }).strict();

// Validate against the complete bilingual source shape, including nested objects and arrays.
// No arbitrary keys, executable markup or untrusted image hosts enter published content.
export function validateContent(value: unknown, lang: Language): CampaignContent {
  function walk(candidate: unknown, template: unknown, path: string): unknown {
    if (typeof template === 'string') {
      if (typeof candidate !== 'string' || candidate.length > 30000) throw new Error(`${path}: enter text (maximum 30,000 characters).`);
      if (/(?:^|\.)(href|url)$/.test(path) && !safeLink(candidate)) throw new Error(`${path}: enter a safe link.`);
      if (/(?:^|\.)(src|image)$/.test(path) && !safeImage(candidate)) throw new Error(`${path}: choose a campaign image.`);
      if (path.endsWith('.position') && !position.safeParse(candidate).success) throw new Error(`${path}: enter a position such as 50% 30%.`);
      return candidate;
    }
    if (Array.isArray(template)) {
      if (!Array.isArray(candidate) || candidate.length < 1 || candidate.length > 100) throw new Error(`${path}: keep between 1 and 100 items.`);
      if (['about.journey', 'plan.policies'].includes(path) && candidate.length !== template.length) throw new Error(`${path}: keep the existing ${template.length} entries.`);
      return candidate.map((item, index) => walk(item, template[0], `${path}.${index}`));
    }
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) throw new Error(`${path}: invalid section.`);
    const source = template as Record<string, unknown>;
    const record = candidate as Record<string, unknown>;
    if (Object.keys(record).some(key => !(key in source))) throw new Error(`${path}: unknown field.`);
    return Object.fromEntries(Object.entries(source).map(([key, entry]) => [key, walk(record[key] ?? entry, entry, path ? `${path}.${key}` : key)]));
  }
  const result = walk(value, content[lang], '') as CampaignContent;
  result.lang = lang;
  result.locale = content[lang].locale;
  return result;
}
export function validateDocument(kind: string, value: unknown, lang: Language | null, publish: boolean) {
  if (kind === 'content' && lang) return validateContent(value, lang);
  if (kind === 'settings') {
    const settings = settingsSchema.parse(value);
    if (publish) {
      for (const method of settings.donationMethods.filter(m => m.enabled)) {
        if (!method.name.trim() || !method.recipient.trim() || !method.currency.trim() || (method.kind === 'link' ? !method.url.startsWith('https://') : !method.account.trim()) || (method.kind === 'crypto' && !method.network.trim())) throw new Error(`Complete the receiving details for ${method.name || 'every enabled payment method'}.`);
      }
      for (const supporter of settings.supporters.filter(s => s.visible)) if (!supporter.name.trim() || !supporter.logo) throw new Error('Add a name and logo for every visible supporting entity.');
    }
    return settings;
  }
  if (kind === 'post') {
    const post = postSchema.parse(value);
    if (publish) {
      if (!post.coverImage) throw new Error('Choose a cover image before publishing.');
      for (const language of ['en', 'so'] as const) {
        const t = post.translations[language];
        if (!t.title.trim() || !t.excerpt.trim() || !t.coverAlt.trim() || !t.blocks.length) throw new Error(`Complete the ${language === 'en' ? 'English' : 'Somali'} title, excerpt, image description and story before publishing.`);
        for (const b of t.blocks) {
          if (['paragraph', 'heading'].includes(b.type) && !b.text.trim()) throw new Error('Fill in or remove empty text blocks.');
          if (b.type === 'image' && (!b.src || !b.alt.trim())) throw new Error('Every story image needs an image and description.');
          if (b.type === 'youtube' && !youtubeId(b.src)) throw new Error('Every video needs a valid YouTube URL.');
        }
      }
    }
    return post;
  }
  throw new Error('Unknown document type.');
}
