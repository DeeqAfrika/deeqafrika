import { getPosts } from "@/lib/cms/content";
import type { MetadataRoute } from "next";
import { languages, sections } from "@/content";
import { getSiteUrl } from "@/lib/site-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getSiteUrl();
  const posts = await getPosts();
  return languages.flatMap((lang) => {
    const paths = [`/${lang}`, ...sections.map((section) => `/${lang}/${section}`), ...posts.map(post => `/${lang}/news/${post.data.slug}`)];
    return paths.map((path) => ({
      url: new URL(path, base).toString(),
      changeFrequency: path.endsWith("/news") ? "weekly" as const : "monthly" as const,
      priority: path === `/${lang}` ? 1 : 0.8,
    }));
  });
}
