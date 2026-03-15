import Link from "next/link";
import { ArticleMeta } from "@/lib/types";
import { categories, difficultyConfig, articleTypeConfig } from "@/lib/config";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const category = categories.find((c) => c.id === article.category);
  const difficulty = difficultyConfig[article.difficulty];
  const articleType = articleTypeConfig[article.type];

  return (
    <Link href={`/articles/${article.slug}`} className="h-full">
      <article
        className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
        style={{ borderLeftWidth: "4px", borderLeftColor: category?.color }}
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className="rounded px-2 py-0.5 text-xs font-medium text-white"
            style={{ backgroundColor: category?.color }}
          >
            {category?.label}
          </span>
          <Badge variant="secondary" className={`text-xs ${difficulty.bgClass}`}>
            {difficulty.label}
          </Badge>
          <span className="text-sm" title={articleType.label}>
            {articleType.icon}
          </span>
        </div>

        <h3 className="mb-1 text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="mb-3 flex-1 line-clamp-2 text-sm text-muted-foreground">
          {article.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span>{formatDate(article.publishedAt)}</span>
          <span>·</span>
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-primary/70">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
