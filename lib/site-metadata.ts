import { headers } from "next/headers";
import type { Metadata } from "next";
import type { CampaignContent, SectionSlug } from "@/content";

export async function getSiteUrl(): Promise<URL> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProtocol ?? (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  return new URL(`${protocol}://${host}`);
}

export async function pageMetadata(
  copy: CampaignContent,
  section?: SectionSlug,
): Promise<Metadata> {
  const base = await getSiteUrl();
  const path = section ? `/${copy.lang}/${section}` : `/${copy.lang}`;
  const otherLang = copy.lang === "en" ? "so" : "en";
  const otherPath = section ? `/${otherLang}/${section}` : `/${otherLang}`;
  let pageTitle = copy.meta.title;
  let description = copy.meta.description;

  if (section) {
    const page = copy[section];
    pageTitle = `${page.title} | ${copy.brand.name}`;
    description = page.intro;
  }

  return {
    metadataBase: base,
    title: pageTitle,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: copy.lang === "en" ? path : otherPath,
        so: copy.lang === "so" ? path : otherPath,
      },
    },
    openGraph: {
      type: "website",
      siteName: copy.brand.name,
      locale: copy.locale,
      title: pageTitle,
      description,
      url: path,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${copy.brand.name} — ${copy.brand.sloganOpen} ${copy.brand.sloganEqual}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["/og.png"],
    },
  };
}
