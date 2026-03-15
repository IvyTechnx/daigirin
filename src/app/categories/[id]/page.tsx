import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { getArticlesByCategory } from "@/lib/articles";
import { categories } from "@/lib/config";
import { CategoryId } from "@/lib/types";

export function generateStaticParams() {
  return categories.map((cat) => ({ id: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);
  if (!category) return { title: "Not Found" };
  return { title: category.label };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);
  if (!category) notFound();

  const articles = getArticlesByCategory(id as CategoryId);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/categories"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        カテゴリ一覧に戻る
      </Link>

      <div className="mb-8 flex items-center gap-3">
        <span
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <h1 className="text-3xl font-bold">{category.label}</h1>
        <span className="text-muted-foreground">({articles.length})</span>
      </div>
      <p className="mb-8 text-muted-foreground">{category.description}</p>

      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
        {articles.length === 0 && (
          <p className="text-muted-foreground">
            このカテゴリにはまだ記事がありません。
          </p>
        )}
      </div>
    </div>
  );
}
