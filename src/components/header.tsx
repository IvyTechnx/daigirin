"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { SearchBox } from "./search-box";

function IvyxonLogo({ className }: { className?: string }) {
  return (
    <span className={`text-xl tracking-wider ${className}`}>
      <span className="font-light text-white/90">IVY</span>
      <span className="font-bold text-[#00D67E]">XON</span>
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A1F1A]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <IvyxonLogo />
          <span className="hidden text-xs text-white/40 sm:block">|</span>
          <span className="hidden text-sm font-medium text-white/70 sm:block">
            Claude Code大全
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/articles" className="text-sm text-white/70 hover:text-[#00D67E] transition-colors">
            記事一覧
          </Link>
          <Link href="/categories" className="text-sm text-white/70 hover:text-[#00D67E] transition-colors">
            カテゴリ
          </Link>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-1 text-sm text-white/70 hover:text-[#00D67E] transition-colors"
          >
            <Search className="h-4 w-4" />
            <kbd className="ml-1 hidden rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-white/40 lg:inline">
              ⌘K
            </kbd>
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          aria-label="メニュー"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-[#0A1F1A] px-4 py-3">
          <div className="mx-auto max-w-5xl">
            <SearchBox onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-[#0A1F1A] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/articles"
              className="text-white/70 hover:text-[#00D67E]"
              onClick={() => setMenuOpen(false)}
            >
              記事一覧
            </Link>
            <Link
              href="/categories"
              className="text-white/70 hover:text-[#00D67E]"
              onClick={() => setMenuOpen(false)}
            >
              カテゴリ
            </Link>
            <SearchBox onClose={() => { setMenuOpen(false); setSearchOpen(false); }} />
          </div>
        </nav>
      )}
    </header>
  );
}
