"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function TableOfContents({ html }: { html: string }) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headings = doc.querySelectorAll("h2, h3");
    const tocItems: TocItem[] = [];
    headings.forEach((h) => {
      tocItems.push({
        id: h.id,
        text: h.textContent || "",
        level: parseInt(h.tagName[1]),
      });
    });
    setItems(tocItems);
  }, [html]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block">
      <div className="sticky top-20">
        <h4 className="mb-3 text-sm font-bold text-foreground">目次</h4>
        <ul className="space-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block text-muted-foreground transition-colors hover:text-primary"
                style={{ paddingLeft: item.level === 3 ? "1rem" : 0 }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 rounded bg-white/10 px-2 py-1 text-xs text-white/60 opacity-0 transition-opacity hover:bg-white/20 hover:text-white group-hover:opacity-100"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function EnhancedContent({ html }: { html: string }) {
  useEffect(() => {
    document.querySelectorAll(".article-content pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn-wrapper")) return;

      pre.classList.add("group", "relative");

      const code = pre.querySelector("code")?.textContent || "";
      const wrapper = document.createElement("div");
      wrapper.className = "copy-btn-wrapper absolute right-2 top-2";

      const btn = document.createElement("button");
      btn.className =
        "rounded bg-white/10 px-2 py-1 text-xs text-white/60 opacity-0 transition-opacity hover:bg-white/20 hover:text-white group-hover:opacity-100";
      btn.textContent = "Copy";
      btn.onclick = async () => {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = "Copy"; }, 2000);
      };

      wrapper.appendChild(btn);
      pre.appendChild(wrapper);
    });
  }, [html]);

  return (
    <div
      className="article-content prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function ArticleContent({ html }: { html: string }) {
  return (
    <div className="flex gap-8">
      <div className="min-w-0 flex-1">
        <EnhancedContent html={html} />
      </div>
      <div className="w-56 shrink-0">
        <TableOfContents html={html} />
      </div>
    </div>
  );
}
