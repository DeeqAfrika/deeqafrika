import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLanguage } from '@/content';
import { getCampaignContent, getPost } from '@/lib/cms/content';
import { getSiteUrl } from '@/lib/site-metadata';
import { StoryBody } from '@/components/StoryBody';
type Props = { params: Promise<{ lang: string; slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) return {};
  const post = await getPost(slug);
  if (!post) return { title: 'Story not found' };
  const t = post.translations[lang];
  return { metadataBase: await getSiteUrl(), title: `${t.title} | Deeq Afrika`, description: t.excerpt, alternates: { canonical: `/${lang}/news/${slug}`, languages: { en: `/en/news/${slug}`, so: `/so/news/${slug}` } }, openGraph: { type: 'article', title: t.title, description: t.excerpt, publishedTime: post.publishedAt, images: [{ url: post.coverImage, alt: t.coverAlt }] } };
}
export default async function StoryPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  const [post, copy] = await Promise.all([getPost(slug), getCampaignContent(lang)]);
  if (!post) notFound();
  const story = post.translations[lang];
  return <main id="main-content" className="story-page"><article><header className="story-heading container"><Link className="arrow-link" href={`/${lang}/news`}>← {copy.participation.backNews}</Link><p className="eyebrow">{story.category}</p><h1>{story.title}</h1><p className="story-excerpt">{story.excerpt}</p><time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString(lang === 'so' ? 'so-SO' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' })}</time></header><div className="story-cover container"><Image src={post.coverImage} alt={story.coverAlt} fill priority sizes="(max-width: 1200px) 100vw, 1200px" style={{ objectPosition: post.coverPosition }} /></div><StoryBody blocks={story.blocks} playLabel={copy.participation.videoConsent} notice={copy.participation.videoNotice} /></article><div className="container story-bottom"><Link className="button button-navy" href={`/${lang}/news`}>{copy.participation.backNews}</Link></div></main>;
}
