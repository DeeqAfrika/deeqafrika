import type { MetadataRoute } from "next";
import { languages, sections } from "@/content";
import { getSiteUrl } from "@/lib/site-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getSiteUrl();
  return languages.flatMap((lang) => {
    const paths = [`/${lang}`, ...sections.map((section) => `/${lang}/${section}`)];
    return paths.map((path) => ({
      url: new URL(path, base).toString(),
      changeFrequency: path.endsWith("/news") ? "weekly" as const : "monthly" as const,
      priority: path === `/${lang}` ? 1 : 0.8,
    }));
  });
}
