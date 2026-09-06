import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import './admin.css';
const sans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
export const metadata: Metadata = { title: 'Campaign workspace | Deeq Afrika', robots: { index: false, follow: false } };
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body className={`${sans.variable} ${mono.variable} admin-body`}>{children}</body></html>; }
