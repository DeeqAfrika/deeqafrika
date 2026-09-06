import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionPage } from "@/components/CampaignPages";
import { content, isLanguage, isSection, languages, sections } from "@/content";
import { pageMetadata } from "@/lib/site-metadata";

type PageProps = { params: Promise<{ lang: string; section: string }> };

export function generateStaticParams() {
  return languages.flatMap((lang) => sections.map((section) => ({ lang, section })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, section } = await params;
  if (!isLanguage(lang) || !isSection(section)) return {};
  return pageMetadata(content[lang], section);
}

export default async function CampaignSection({ params }: PageProps) {
  const { lang, section } = await params;
  if (!isLanguage(lang) || !isSection(section)) notFound();
  return <SectionPage copy={content[lang]} section={section} />;
}
