import fs from "fs";
import path from "path";
import matter from "gray-matter";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export function getExistingSlugs() {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getExistingMetas() {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const content = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8");
      const { data } = matter(content);
      return {
        slug: data.slug || f.replace(/\.md$/, ""),
        title: data.title,
        category: data.category,
        description: data.description || "",
      };
    });
}

export function isTopicCovered(slug) {
  return getExistingSlugs().includes(slug);
}
