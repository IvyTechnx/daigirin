import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { getArticlesByTag, getAllTags } from "@/lib/articles";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ name: tag.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  return { title: `#${decodeURIComponent(name)}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const tagName = decodeURIComponent(name);
  const articles = getArticlesByTag(tagName);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/articles"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        記事一覧に戻る
      </Link>

      <h1 className="mb-8 text-3xl font-bold">
        <span className="text-primary">#{tagName}</span>
        <span className="ml-2 text-lg text-muted-foreground">
          ({articles.length})
        </span>
      </h1>

      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
        {articles.length === 0 && (
          <p className="text-muted-foreground">
            このタグの記事はまだありません。
          </p>
        )}
      </div>
    </div>
  );
}
