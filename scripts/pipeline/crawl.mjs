import { readCache, writeCache } from "./cache.mjs";

const USER_AGENT = "ivyxon-tips-crawler/1.0";

// --- HTML to plain text ---

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMainContent(html) {
  // Try to extract <main> or <article> content first
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const target = mainMatch?.[1] || articleMatch?.[1] || html;
  return stripHtml(target).slice(0, 4000);
}

// --- Anthropic Docs ---

async function crawlAnthropicDocs(hints) {
  const docPaths = hints.docPaths || [];
  const results = [];

  for (const docPath of docPaths) {
    const cacheKey = `docs-${docPath}`;
    const cached = readCache(cacheKey);
    if (cached) {
      results.push(cached);
      continue;
    }

    try {
      const url = `https://docs.anthropic.com/en/docs/${docPath}`;
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
      });
      if (!res.ok) {
        console.log(`  [docs] ${docPath}: HTTP ${res.status}, skipping`);
        continue;
      }
      const html = await res.text();
      const content = extractMainContent(html);
      const item = { source: "anthropic-docs", title: docPath, content, url };
      writeCache(cacheKey, item);
      results.push(item);
    } catch (err) {
      console.log(`  [docs] ${docPath}: ${err.message}, skipping`);
    }
  }

  return results;
}

// --- GitHub Releases ---

async function crawlGitHubRepo(hints) {
  const keywords = hints.githubKeywords || [];
  const cacheKey = "github-releases";
  const cached = readCache(cacheKey);

  let releases;
  if (cached?.releases) {
    releases = cached.releases;
  } else {
    try {
      const res = await fetch(
        "https://api.github.com/repos/anthropics/claude-code/releases?per_page=5",
        { headers: { "User-Agent": USER_AGENT } }
      );
      if (!res.ok) {
        console.log(`  [github] HTTP ${res.status}, skipping`);
        return [];
      }
      releases = await res.json();
      writeCache(cacheKey, { releases });
    } catch (err) {
      console.log(`  [github] ${err.message}, skipping`);
      return [];
    }
  }

  return releases
    .filter(
      (r) =>
        r.body &&
        keywords.some((kw) => r.body.toLowerCase().includes(kw.toLowerCase()))
    )
    .map((r) => ({
      source: "github-releases",
      title: r.tag_name,
      content: r.body.slice(0, 3000),
      url: r.html_url,
    }));
}

// --- Reddit ---

async function crawlCommunity(hints) {
  const terms = hints.searchTerms || [];
  const results = [];

  for (const term of terms) {
    const cacheKey = `reddit-${term}`;
    const cached = readCache(cacheKey);
    if (cached?.posts) {
      results.push(...cached.posts);
      continue;
    }

    try {
      const url = `https://www.reddit.com/r/ClaudeAI/search.json?q=${encodeURIComponent(term)}&sort=new&limit=5&restrict_sr=true`;
      const res = await fetch(url, {
        headers: { "User-Agent": USER_AGENT },
      });
      if (!res.ok) {
        console.log(`  [reddit] "${term}": HTTP ${res.status}, skipping`);
        continue;
      }
      const data = await res.json();
      const posts = (data?.data?.children || [])
        .filter((p) => p.data.selftext)
        .map((p) => ({
          source: "reddit",
          title: p.data.title,
          content: p.data.selftext.slice(0, 2000),
          url: `https://reddit.com${p.data.permalink}`,
        }));
      writeCache(cacheKey, { posts });
      results.push(...posts);
    } catch (err) {
      console.log(`  [reddit] "${term}": ${err.message}, skipping`);
    }
  }

  return results;
}

// --- Public API ---

export async function crawlSources(topic) {
  console.log(`[crawl] Fetching sources for: ${topic.slug}`);
  const hints = topic.crawlHints || {};

  const [docs, github, community] = await Promise.allSettled([
    crawlAnthropicDocs(hints),
    crawlGitHubRepo(hints),
    crawlCommunity(hints),
  ]);

  const results = [
    ...(docs.status === "fulfilled" ? docs.value : []),
    ...(github.status === "fulfilled" ? github.value : []),
    ...(community.status === "fulfilled" ? community.value : []),
  ];

  console.log(
    `[crawl] Got ${results.filter((r) => r.source === "anthropic-docs").length} docs, ` +
      `${results.filter((r) => r.source === "github-releases").length} releases, ` +
      `${results.filter((r) => r.source === "reddit").length} reddit posts`
  );

  return results;
}
