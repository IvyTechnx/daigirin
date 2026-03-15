#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { topicBacklog } from "./pipeline/topics.mjs";
import { crawlSources } from "./pipeline/crawl.mjs";
import { generateArticle, buildDryRunPrompt } from "./pipeline/generate.mjs";
import { getExistingSlugs, getExistingMetas } from "./pipeline/dedup.mjs";

// --- Load .env ---

function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv();

// --- CLI args ---

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { topic: null, category: null, dryRun: false, noCrawl: false };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--topic" && args[i + 1]) opts.topic = args[++i];
    if (args[i] === "--category" && args[i + 1]) opts.category = args[++i];
    if (args[i] === "--dry-run") opts.dryRun = true;
    if (args[i] === "--no-crawl") opts.noCrawl = true;
    if (args[i] === "--list") {
      listTopics();
      process.exit(0);
    }
  }
  return opts;
}

function listTopics() {
  const existing = getExistingSlugs();
  console.log("\n--- Topic Backlog ---\n");
  for (const t of topicBacklog) {
    const done = existing.includes(t.slug);
    const mark = done ? "[done]" : "[    ]";
    console.log(`${mark} ${t.slug} — ${t.title} (${t.category})`);
  }
  console.log("");
}

// --- Topic selection ---

function selectTopic(opts) {
  const existing = getExistingSlugs();

  if (opts.topic) {
    const found = topicBacklog.find((t) => t.slug === opts.topic);
    if (!found) {
      console.error(`[error] Topic "${opts.topic}" not found in backlog.`);
      console.error(
        `Available: ${topicBacklog.map((t) => t.slug).join(", ")}`
      );
      process.exit(1);
    }
    if (existing.includes(found.slug)) {
      console.log(
        `[warn] Article "${found.slug}" already exists. Overwriting draft.`
      );
    }
    return found;
  }

  let candidates = topicBacklog.filter((t) => !existing.includes(t.slug));
  if (opts.category) {
    candidates = candidates.filter((t) => t.category === opts.category);
  }

  if (candidates.length === 0) {
    console.log("[done] All topics in the backlog have been published!");
    console.log("Add new topics to scripts/pipeline/topics.mjs");
    process.exit(0);
  }

  return candidates[0];
}

// --- Main ---

async function main() {
  const opts = parseArgs();

  // Validate API key (unless dry run)
  if (!opts.dryRun && !process.env.ANTHROPIC_API_KEY) {
    console.error("[error] ANTHROPIC_API_KEY is not set.");
    console.error("  export ANTHROPIC_API_KEY=sk-ant-...");
    console.error("  Or use --dry-run to preview without API call.");
    process.exit(1);
  }

  // Select topic
  const topic = selectTopic(opts);
  console.log(`\n=== Generating: ${topic.title} ===\n`);

  // Crawl
  let sources = [];
  if (!opts.noCrawl) {
    sources = await crawlSources(topic);
  } else {
    console.log("[crawl] Skipped (--no-crawl)");
  }

  // Get existing articles for dedup
  const existingMetas = getExistingMetas();

  // Dry run
  if (opts.dryRun) {
    const prompt = buildDryRunPrompt(topic, sources, existingMetas);
    console.log("\n--- DRY RUN: System Prompt ---");
    console.log(prompt.system.slice(0, 500) + "...");
    console.log(`\n--- DRY RUN: User Prompt (${prompt.user.length} chars) ---`);
    console.log(prompt.user.slice(0, 1000) + "...");
    console.log(`\n--- Model: ${prompt.model} ---`);
    console.log("\nUse without --dry-run to generate the article.");
    return;
  }

  // Generate
  const article = await generateArticle(topic, sources, existingMetas);

  // Write file
  const outputPath = path.join(
    process.cwd(),
    "content",
    "articles",
    `${topic.slug}.md`
  );
  fs.writeFileSync(outputPath, article, "utf8");
  const charCount = article.length;
  console.log(`\n[write] ${outputPath} (${charCount} chars)`);

  // Summary
  console.log("\n--- Next steps ---");
  console.log(`1. Review:   cat content/articles/${topic.slug}.md`);
  console.log(`2. Preview:  npm run dev`);
  console.log(
    `3. Deploy:   npm run build && wrangler pages deploy out --project-name claude-code-tips`
  );
  console.log("");
}

main().catch((err) => {
  console.error("[error]", err.message);
  process.exit(1);
});
