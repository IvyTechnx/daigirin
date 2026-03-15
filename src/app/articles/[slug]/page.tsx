import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArticleContent } from "@/components/article-content";
import { getArticle, getAllSlugs } from "@/lib/articles";
import { categories, difficultyConfig, articleTypeConfig, siteConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Not Found" };
  const category = categories.find((c) => c.id === article.category);
  return {
    title: article.title,
    description: article.description,
    keywords: [
      "Claude Code",
      ...article.tags,
      category?.label || "",
      "プロンプト",
      "使い方",
    ].filter(Boolean),
    alternates: {
      canonical: `${siteConfig.url}/articles/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const category = categories.find((c) => c.id === article.category);
  const difficulty = difficultyConfig[article.difficulty];
  const articleType = articleTypeConfig[article.type];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { "@type": "Organization", name: "IVYXON", url: "https://ivyxon.com" },
    publisher: { "@type": "Organization", name: "IVYXON" },
    keywords: article.tags.join(", "),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/articles"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        記事一覧に戻る
      </Link>

      {/* Article header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="rounded px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: category?.color }}
          >
            {category?.label}
          </span>
          <Badge variant="secondary" className={`text-xs ${difficulty.bgClass}`}>
            {difficulty.label}
          </Badge>
          <span className="text-sm">{articleType.icon} {articleType.label}</span>
        </div>

        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{article.title}</h1>

        <p className="mb-4 text-lg text-muted-foreground">{article.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span>{formatDate(article.publishedAt)}</span>
          {article.updatedAt && article.updatedAt !== article.publishedAt && (
            <span>(更新: {formatDate(article.updatedAt)})</span>
          )}
          <span>{article.readingTime}分で読めます</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <hr className="mb-8" />

      {/* Article content */}
      <ArticleContent html={article.htmlContent} />
    </div>
  );
}
