import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/article-card";
import { CategoryCard } from "@/components/category-card";
import { getAllArticleMetas, getFeaturedArticles, getCategoryCounts } from "@/lib/articles";
import { categories, siteConfig } from "@/lib/config";

export default function HomePage() {
  const allArticles = getAllArticleMetas();
  const featured = getFeaturedArticles();
  const counts = getCategoryCounts();

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0A1F1A] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mb-3 text-sm tracking-widest text-[#00D67E]/70">
            Powered by <span className="font-light">IVY</span><span className="font-bold">XON</span>
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Claude Codeに
            <span className="text-[#00D67E]">雑に投げて</span>
            <br />
            アプリを作る
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/50">
            {siteConfig.description}
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-[#0B6E4F] hover:bg-[#0B6E4F]/80">
              <Link href="/articles">記事を読む</Link>
            </Button>
            <Button asChild size="lg" className="border border-[#00D67E]/30 bg-transparent text-white hover:bg-[#00D67E]/10">
              <Link href="/categories">カテゴリ一覧</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* "やりたいことから探す" */}
      <section className="mx-auto max-w-5xl px-4 pt-12 pb-4">
        <h2 className="mb-6 text-2xl font-bold">🔍 やりたいことから探す</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { q: "「アプリ作って」で始めたい", slug: "first-things-to-do", emoji: "🚀" },
            { q: "壊れた。助けて", slug: "fix-broken-app", emoji: "🔥" },
            { q: "見た目がダサい。なんとかして", slug: "make-it-pretty", emoji: "✨" },
            { q: "スクショ見せて「これ作って」", slug: "screenshot-driven-dev", emoji: "📸" },
            { q: "DB追加したい", slug: "add-database", emoji: "🗄️" },
            { q: "テスト書いて・通して", slug: "write-tests", emoji: "🧪" },
            { q: "Git操作・PR作成を任せたい", slug: "git-and-pr", emoji: "🔀" },
            { q: "他人のコードを理解したい", slug: "read-someone-code", emoji: "🔍" },
            { q: "CSV処理ツール作って", slug: "csv-excel-tools", emoji: "📊" },
            { q: "API作ってフロントもつけて", slug: "api-development", emoji: "🔌" },
            { q: "コードが汚い。きれいにして", slug: "refactor-cleanup", emoji: "🧹" },
            { q: "デプロイして公開したい", slug: "deploy-app", emoji: "🌐" },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/articles/${item.slug}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-medium text-card-foreground">{item.q}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">カテゴリ</h2>
        <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              count={counts.get(cat.id) || 0}
              compact
            />
          ))}
        </div>
      </section>

      {/* Featured articles */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-8">
          <h2 className="mb-6 text-2xl font-bold">注目の記事</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Recent articles */}
      <section className="mx-auto max-w-5xl px-4 py-8 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">最新の記事</h2>
          <Link href="/articles" className="text-sm text-primary hover:underline">
            すべて見る →
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {allArticles.slice(0, 5).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
