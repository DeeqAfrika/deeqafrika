import { cache } from 'react';
import { content, type Language } from '@/content';
import { defaultSettings } from '@/content/cms-defaults';
import { cmsConfigured, publicClient } from './supabase';
import type { CampaignSettings, CmsDocument, Post } from './types';
import { validateContent, postSchema, settingsSchema } from './validation';

export const getCampaignContent = cache(async (lang: Language) => {
  if (!cmsConfigured()) return content[lang];
  const { data, error } = await publicClient().from('campaign_documents').select('data').eq('id', `content-${lang}-published`).maybeSingle();
  if (error) { console.error('Campaign content unavailable:', error.code); return content[lang]; }
  if (!data) return content[lang];
  try { return validateContent(data.data, lang); } catch { console.error('Invalid published content:', lang); return content[lang]; }
});
export const getSettings = cache(async (): Promise<CampaignSettings> => {
  if (!cmsConfigured()) return defaultSettings;
  const { data, error } = await publicClient().from('campaign_documents').select('data').eq('id', 'settings-published').maybeSingle();
  if (error) console.error('Campaign settings unavailable:', error.code);
  const parsed = settingsSchema.safeParse(data?.data);
  return parsed.success ? parsed.data : defaultSettings;
});
export const getPosts = cache(async (): Promise<CmsDocument<Post>[]> => {
  if (!cmsConfigured()) return [];
  const { data, error } = await publicClient().from('campaign_documents').select('*').eq('kind', 'post').eq('status', 'published').order('updated_at', { ascending: false }).limit(200);
  if (error) { console.error('Campaign news unavailable:', error.code); return []; }
  return (data ?? []).filter(row => postSchema.safeParse(row.data).success).sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt));
});
export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!cmsConfigured() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const { data, error } = await publicClient().from('campaign_documents').select('data').eq('kind', 'post').eq('status', 'published').eq('data->>slug', slug).maybeSingle();
  if (error) return null;
  const parsed = postSchema.safeParse(data?.data);
  return parsed.success ? parsed.data : null;
});
