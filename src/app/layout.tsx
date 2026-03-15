import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Claude Codeの使い方・プロンプト実践集【2026年版】`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Claude Codeに雑にプロンプトを投げてアプリを作る実践Tips集。MCP設定、CLAUDE.md、Hooks、プロンプトの書き方まで初心者向けに解説。Powered by IVYXON。",
  keywords: [
    "Claude Code",
    "Claude Code 使い方",
    "Claude Code 初心者",
    "Claude Code プロンプト",
    "Claude Code MCP",
    "Claude Code MCP 設定",
    "Claude Code Hooks",
    "CLAUDE.md 書き方",
    "Claude Code 入門",
    "Claude Code Tips",
    "Claude Code 設定",
    "Claude Code 権限",
    "Claude Code バイブコーディング",
    "AI アプリ開発",
    "IVYXON",
  ],
  authors: [{ name: "IVYXON", url: "https://ivyxon.com" }],
  creator: "IVYXON",
  publisher: "IVYXON",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Claude Code Tips | 雑に投げてアプリを作る実践プロンプト集",
    description:
      "Claude Codeに雑にプロンプトを投げてアプリを作る。コピペで使える実践Tips集。MCP、CLAUDE.md、Hooks、権限設定まで網羅。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Tips | 雑に投げてアプリを作る実践プロンプト集",
    description:
      "Claude Codeに雑にプロンプトを投げてアプリを作る。コピペで使える実践Tips集。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <Header />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
