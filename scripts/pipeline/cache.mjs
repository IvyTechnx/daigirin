import fs from "fs";
import path from "path";

const CACHE_DIR = path.join(process.cwd(), "content", ".crawl-cache");
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function ensureDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function sanitizeKey(key) {
  return key.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export function readCache(key) {
  ensureDir();
  const filePath = path.join(CACHE_DIR, `${sanitizeKey(key)}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (Date.now() - raw._cachedAt > TTL_MS) {
    fs.unlinkSync(filePath);
    return null;
  }
  const { _cachedAt, ...data } = raw;
  return data;
}

export function writeCache(key, data) {
  ensureDir();
  const filePath = path.join(CACHE_DIR, `${sanitizeKey(key)}.json`);
  fs.writeFileSync(
    filePath,
    JSON.stringify({ ...data, _cachedAt: Date.now() }, null, 2)
  );
}
