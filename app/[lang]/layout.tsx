import { getCampaignContent } from "@/lib/cms/content";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { isLanguage } from "@/content";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Deeq M Afrika Campaign",
  keywords: ["Deeq Afrika", "Somali football", "SFF", "Vision 2034", "Xiriir Furan", "Fursad Siman"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const dynamic = "force-dynamic";

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const copy = await getCampaignContent(lang);

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SiteHeader copy={copy} />
        {children}
        <SiteFooter copy={copy} />
      </body>
    </html>
  );
}
