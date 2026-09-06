import { notFound } from "next/navigation";
import { content, isLanguage } from "@/content";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "so" }];
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = content[lang];

  return (
    <>
      <SiteHeader copy={copy} />
      {children}
      <SiteFooter copy={copy} />
    </>
  );
}
