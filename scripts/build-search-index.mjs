import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content", "articles");
const outputPath = path.join(process.cwd(), "public", "search-index.json");

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

const index = files.map((file) => {
  const content = fs.readFileSync(path.join(articlesDir, file), "utf8");
  const { data } = matter(content);
  return {
    title: data.title,
    slug: data.slug || file.replace(/\.md$/, ""),
    description: data.description || "",
    category: data.category,
    tags: data.tags || [],
    difficulty: data.difficulty || "beginner",
    type: data.type || "tip",
    publishedAt: data.publishedAt,
  };
});

fs.writeFileSync(outputPath, JSON.stringify(index, null, 0));
console.log(`Search index built: ${index.length} articles`);
