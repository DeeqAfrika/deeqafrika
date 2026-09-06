import { en } from "./en";
import { so } from "./so";
import type { CampaignContent, Language, NavKey, SectionSlug } from "./types";

export const languages: Language[] = ["en", "so"];

export const sections: SectionSlug[] = [
  "vision",
  "plan",
  "about",
  "news",
  "media",
  "join",
];

export const content: Record<Language, CampaignContent> = { en, so };

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export function isSection(value: string): value is SectionSlug {
  return sections.includes(value as SectionSlug);
}

export function routeFor(lang: Language, key: NavKey): string {
  return key === "home" ? `/${lang}` : `/${lang}/${key}`;
}

export function switchLanguagePath(pathname: string, lang: Language): string {
  const parts = pathname.split("/").filter(Boolean);
  const section = parts[1];
  return section && isSection(section) ? `/${lang}/${parts.slice(1).join("/")}` : `/${lang}`;
}

export type { CampaignContent, Language, NavKey, SectionSlug };
