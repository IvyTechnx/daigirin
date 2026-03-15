import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Article, ArticleMeta, CategoryId } from "./types";
import { estimateReadingTime } from "./utils";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function getArticleFiles(): string[] {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs.readdirSync(articlesDirectory).filter((f) => f.endsWith(".md"));
}

async function renderMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  return result.toString();
}

export function getArticleMeta(slug: string): ArticleMeta | null {
  const filePath = path.join(articlesDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  return {
    title: data.title,
    slug: data.slug || slug,
    description: data.description || "",
    author: data.author || "daigirin",
    category: data.category as CategoryId,
    tags: data.tags || [],
    difficulty: data.difficulty || "beginner",
    type: data.type || "tip",
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    featured: data.featured || false,
  };
}

export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(articlesDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = await renderMarkdown(content);

  return {
    title: data.title,
    slug: data.slug || slug,
    description: data.description || "",
    author: data.author || "daigirin",
    category: data.category as CategoryId,
    tags: data.tags || [],
    difficulty: data.difficulty || "beginner",
    type: data.type || "tip",
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    featured: data.featured || false,
    content,
    htmlContent,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllArticleMetas(): ArticleMeta[] {
  const files = getArticleFiles();
  const metas = files
    .map((f) => getArticleMeta(f.replace(/\.md$/, "")))
    .filter((m): m is ArticleMeta => m !== null);
  return metas.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getAllSlugs(): string[] {
  return getArticleFiles().map((f) => f.replace(/\.md$/, ""));
}

export function getArticlesByCategory(categoryId: CategoryId): ArticleMeta[] {
  return getAllArticleMetas().filter((a) => a.category === categoryId);
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return getAllArticleMetas().filter((a) => a.tags.includes(tag));
}

export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();
  for (const meta of getAllArticleMetas()) {
    for (const tag of meta.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticleMetas().filter((a) => a.featured);
}

export function getCategoryCounts(): Map<CategoryId, number> {
  const counts = new Map<CategoryId, number>();
  for (const meta of getAllArticleMetas()) {
    counts.set(meta.category, (counts.get(meta.category) || 0) + 1);
  }
  return counts;
}
