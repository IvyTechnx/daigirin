import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL = "https://tips.ivyxon.com";
const articlesDir = path.join(process.cwd(), "content", "articles");
const outputPath = path.join(process.cwd(), "public", "sitemap.xml");

const categories = [
  "claude-md", "mcp", "prompts", "keybindings",
  "permissions", "hooks", "workflow", "tips",
];

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

const articles = files.map((file) => {
  const content = fs.readFileSync(path.join(articlesDir, file), "utf8");
  const { data } = matter(content);
  return {
    slug: data.slug || file.replace(/\.md$/, ""),
    publishedAt: data.publishedAt,
    tags: data.tags || [],
  };
});

const allTags = [...new Set(articles.flatMap((a) => a.tags))];

const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/articles", priority: "0.9", changefreq: "weekly" },
  { loc: "/categories", priority: "0.8", changefreq: "monthly" },
  { loc: "/search", priority: "0.5", changefreq: "monthly" },
  { loc: "/disclaimer", priority: "0.3", changefreq: "yearly" },
  ...categories.map((id) => ({
    loc: `/categories/${id}`,
    priority: "0.7",
    changefreq: "weekly",
  })),
  ...articles.map((a) => ({
    loc: `/articles/${a.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: a.publishedAt,
  })),
  ...allTags.map((tag) => ({
    loc: `/tags/${encodeURIComponent(tag)}`,
    priority: "0.5",
    changefreq: "weekly",
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync(outputPath, sitemap);
console.log(`Sitemap built: ${urls.length} URLs`);
