import type { Language } from '@/content/types';

export type ImageAsset = { src: string; alt: string; position: string };
export type ImageSlot = 'homeHero' | 'homeCommunity' | 'homeVision' | 'homeRegions' | 'visionHero' | 'visionMasterplan' | 'planHero' | 'aboutHero' | 'aboutLeadership' | 'journeyPlayer' | 'journeyInternational' | 'journeyBuilder' | 'journeyLeader' | 'newsHero' | 'mediaHero' | 'joinHero';
export type Block = { id: string; type: 'paragraph' | 'heading' | 'image' | 'youtube'; text: string; src: string; alt: string; caption: string };
export type PostTranslation = { title: string; excerpt: string; category: string; coverAlt: string; blocks: Block[] };
export type Post = { slug: string; coverImage: string; coverPosition: string; publishedAt: string; translations: Record<Language, PostTranslation> };
export type DonationMethod = { id: string; name: string; kind: 'mobile' | 'crypto' | 'link'; enabled: boolean; account: string; recipient: string; network: string; currency: string; url: string; instructions: Record<Language, string> };
export type Endorsement = { id: string; name: string; logo: string; url: string; visible: boolean; description: Record<Language, string> };
export type CampaignSettings = { donationMethods: DonationMethod[]; supporters: Endorsement[] };
export type DocumentKind = 'content' | 'post' | 'settings';
export type CmsDocument<T = unknown> = { id: string; kind: DocumentKind; locale: Language | null; status: 'draft' | 'published'; data: T; revision: number; updated_at: string };
export type Supporter = { id: string; name: string; email: string; phone: string; region: string; role: string; message: string; locale: Language; created_at: string; consent_at: string; consent_text: string };
