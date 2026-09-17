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
];

// **/tags/* と /search は sitemap に載せない**（2026-09-17）。
// タグ一覧は索引であってコンテンツではなく、実測で本文 54 字・独自の散文 0 字。
// /search はクライアント描画なのでクローラから見ると可視 29 字の殻。
// 45 本のタグページが tips.ivyxon.com（94 URL）の半分を占めていた。
//
// AdSense の承認は**ドメイン単位**なので tips も ivyxon.com の審査対象に入る。
// 2026-09-17 に ivyxon.com が「有用性の低いコンテンツ」で3回目の差し戻しを受け、
// 到達できる 1,158 URL のうち 725 本（62.6%）が独自の散文 200 字未満だった。
//
// **sitemap から外すだけでは足りない。** 2026-09-02 に 90_IVYXON 側で
// 「sitemap から外して noindex」を打ったが、ページは 200 のまま・リンクも残ったままで
// AdSense のクロールからは何も消えず、差し戻しが止まらなかった。3点セットで外すこと:
//   1. ここ（sitemap）  2. page.tsx の robots: { index: false }  3. public/robots.txt の Disallow
// allTags は残してある——タグ自体は記事ページ内のリンクとして生きている。
void allTags;

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
