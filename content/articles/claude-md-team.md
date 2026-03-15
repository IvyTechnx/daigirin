---
title: "「チームで使いたい」CLAUDE.mdをチーム共有する方法"
slug: "claude-md-team"
description: "CLAUDE.mdをGitにコミットしてチーム全員のClaude Codeの品質を揃える。"
author: "daigirin"
category: "claude-md"
tags: ["CLAUDE.md", "チーム", "プロンプト"]
difficulty: "intermediate"
type: "tip"
publishedAt: "2026-03-13"
featured: false
---

## CLAUDE.mdはGitにコミットしていい

CLAUDE.mdにはAPIキーや秘密情報を書かないので、**普通にGitにコミットしてOK**。

```
git add CLAUDE.md
git commit -m "Add CLAUDE.md for Claude Code"
```

チーム全員がcloneした時点で、同じCLAUDE.mdが読み込まれる。

## チーム向けCLAUDE.mdのテンプレ

```markdown
# プロジェクト名

## Overview
（プロジェクトの概要を1-2行で）

## Commands
- Dev: npm run dev
- Build: npm run build
- Test: npm test
- Lint: npm run lint

## Architecture
- src/app/ — Pages (Next.js App Router)
- src/components/ — UI components
- src/lib/ — Business logic
- src/db/ — Database layer

## Coding Standards
- TypeScript strict mode
- Components: PascalCase
- Files: kebab-case
- Commits: Conventional Commits format
- PR: Always create, never push to main directly

## Do NOT
- Do not modify .env files
- Do not run database migrations without confirmation
- Do not delete test files
```

## 個人設定は別ファイルで

チーム共有のCLAUDE.mdと、自分だけの設定を分ける：

```
CLAUDE.md           ← チーム共有（Gitにコミット）
~/.claude/CLAUDE.md ← 個人設定（Gitに入らない）
```

個人設定の例：

```markdown
## My Preferences
- 日本語で回答して
- コードにはコメントを多めにつけて
- 変更前に必ず方針を確認して
```

## 新メンバーのオンボーディングが楽になる

CLAUDE.mdがあれば、新メンバーが：

```
このプロジェクトの全体像を教えて
```

と聞くだけで、CLAUDE.mdの情報も加味した正確な回答が返ってくる。

READMEより実践的なオンボーディングツールになる。
