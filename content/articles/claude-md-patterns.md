---
title: "「何回も同じこと言うの面倒」CLAUDE.mdに書いとけば解決する"
slug: "claude-md-patterns"
description: "毎回伝えてる指示をCLAUDE.mdに書くだけで、Claude Codeが自動で従ってくれる。"
author: "daigirin"
category: "claude-md"
tags: ["CLAUDE.md", "効率化", "プロンプト"]
difficulty: "beginner"
type: "tip"
publishedAt: "2026-03-14"
featured: false
---

## こんな経験ない？

- 「日本語でコメント書いて」って毎回言ってる
- 「shadcn/ui使って」って毎回言ってる
- 「テストはvitest」って毎回言ってる

**全部CLAUDE.mdに書いとけ。**

## 書き方

プロジェクトのルートに `CLAUDE.md` を作る：

```markdown
# プロジェクト名

## コマンド
- dev: npm run dev
- build: npm run build
- test: npm test

## ルール
- UIは日本語
- コメントは日本語
- shadcn/uiを使う
- テストはvitestで書く
- ファイル名はkebab-case
```

## もっと楽な方法: `/init`

```
/init
```

Claude Codeがプロジェクトを見て、CLAUDE.mdを自動生成してくれる。それを手で微調整するのが一番早い。

## 実践パターン集

### Webアプリ

```markdown
## Stack
- Next.js 16 (App Router)
- Tailwind CSS v4
- shadcn/ui (new-york style)
- SQLite (better-sqlite3)

## Rules
- Always use TypeScript strict mode
- UI language: Japanese
- Use server components by default
- Client components only when needed (useState, useEffect)
```

### Pythonプロジェクト

```markdown
## Commands
- Run: python main.py
- Test: pytest
- Lint: ruff check .

## Rules
- Python 3.12+
- Type hints required
- Use pathlib, not os.path
- Docstrings in Japanese
```

### モノレポ

```markdown
## Structure
- apps/web — Next.js frontend
- apps/api — FastAPI backend
- packages/shared — Shared types

## Commands
- Frontend dev: cd apps/web && npm run dev
- Backend dev: cd apps/api && uvicorn main:app --reload
```

## `/compact` しても消えない理由

CLAUDE.mdは会話のコンテキストとは別に、**毎回新しく読み込まれる**。だから `/compact` や `/clear` しても、CLAUDE.mdに書いた指示は消えない。

「忘れてほしくないこと」はCLAUDE.mdに書く。これ鉄則。
