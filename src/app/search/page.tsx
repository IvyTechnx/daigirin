"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ArticleMeta } from "@/lib/types";

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ArticleMeta[]>([]);
  const [allArticles, setAllArticles] = useState<ArticleMeta[]>([]);

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then(setAllArticles)
      .catch(() => setAllArticles([]));
  }, []);

  useEffect(() => {
    if (!query.trim() || allArticles.length === 0) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query, allArticles]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">検索</h1>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="記事タイトル、説明、タグで検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 text-lg"
          autoFocus
        />
      </div>

      {query.trim() && (
        <p className="mb-4 text-sm text-muted-foreground">
          {results.length}件の結果
        </p>
      )}

      <div className="flex flex-col gap-4">
        {results.map((article) => (
          <a
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="rounded-lg border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="mb-1 font-bold text-card-foreground">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {article.description}
            </p>
            <div className="mt-2 flex gap-1">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs text-primary/70">
                  #{tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {query.trim() && results.length === 0 && allArticles.length > 0 && (
        <p className="text-center text-muted-foreground">
          「{query}」に一致する記事が見つかりませんでした。
        </p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-8">読み込み中...</div>}>
      <SearchResults />
    </Suspense>
  );
}
