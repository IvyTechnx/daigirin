import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getAllArticleMetas, getAllTags } from "@/lib/articles";
import { categories, difficultyConfig } from "@/lib/config";
import Link from "next/link";

export const metadata: Metadata = {
  title: "記事一覧",
};

export default function ArticlesPage() {
  const articles = getAllArticleMetas();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">記事一覧</h1>

      <div className="lg:flex lg:gap-8">
        {/* Article list */}
        <div className="flex min-w-0 flex-col gap-4 lg:flex-1">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
          {articles.length === 0 && (
            <p className="text-muted-foreground">記事がまだありません。</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-bold text-foreground">カテゴリ</h3>
            <ul className="space-y-1.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.id}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Difficulty */}
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-bold text-foreground">難易度</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(difficultyConfig).map(([key, config]) => (
                <span
                  key={key}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${config.bgClass}`}
                >
                  {config.label}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-foreground">タグ</h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tags/${encodeURIComponent(tag.name)}`}
                  className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{tag.name}
                  <span className="ml-1 text-[10px] opacity-60">{tag.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
