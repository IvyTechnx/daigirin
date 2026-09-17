import type { Metadata } from "next";

// 検索ページは入力欄と JS の結果表示だけで、クローラから見ると本文 0 字の殻
// （実測: 可視 29 字）。`page.tsx` が "use client" なので generateMetadata を
// 置けず、layout 側で noindex にする。robots.txt にも Disallow を置いてある——
// noindex は検索の索引に対する指示でしかなく、AdSense のクロールからは外れない。
export const metadata: Metadata = {
  title: "検索",
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
