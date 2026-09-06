import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HomePage } from "@/components/CampaignPages";
import { content, isLanguage } from "@/content";
import { pageMetadata } from "@/lib/site-metadata";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return pageMetadata(content[lang]);
}

export default async function LanguageHome({ params }: PageProps) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return <HomePage copy={content[lang]} />;
}
