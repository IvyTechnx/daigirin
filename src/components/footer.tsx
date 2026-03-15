import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0A1F1A] text-white/60">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col items-center gap-4 text-sm">
          {/* IVYXON Logo */}
          <div className="text-lg tracking-wider">
            <span className="font-light text-white/80">IVY</span>
            <span className="font-bold text-[#00D67E]">XON</span>
          </div>

          <p className="text-center text-white/40">
            AIを活用したソフトウェア開発のご相談はお気軽にどうぞ。
          </p>

          <div className="flex gap-6 text-xs text-white/40">
            <Link href="/articles" className="hover:text-[#00D67E] transition-colors">
              記事一覧
            </Link>
            <Link href="/categories" className="hover:text-[#00D67E] transition-colors">
              カテゴリ
            </Link>
            <a
              href="https://ivyxon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D67E] transition-colors"
            >
              ivyxon.com
            </a>
          </div>

          <p className="mt-2 text-xs text-white/30">
            &copy; 2026 IVYXON. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
