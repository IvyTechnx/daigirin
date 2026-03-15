---
title: "CLAUDE.mdの書き方完全ガイド"
slug: "claude-md-guide"
description: "Claude Codeを使いこなすためのCLAUDE.md設定の基本と応用パターンを解説します。"
author: "daigirin"
category: "claude-md"
tags: ["CLAUDE.md", "設定", "入門"]
difficulty: "beginner"
type: "tip"
publishedAt: "2026-03-15"
featured: true
---

## CLAUDE.mdとは

`CLAUDE.md`はClaude Codeがプロジェクトを理解するための設定ファイルです。プロジェクトのルートに配置することで、Claude Codeがコードベースの構造、規約、ビルド方法を自動的に把握します。

## 基本構成

最小限のCLAUDE.mdは以下のような構成になります：

```markdown
# プロジェクト名

## 概要
このプロジェクトの目的と技術スタックの簡潔な説明。

## コマンド
- ビルド: `npm run build`
- テスト: `npm test`
- 開発サーバー: `npm run dev`

## アーキテクチャ
主要なディレクトリ構成と責務の説明。
```

## 効果的なセクション

### 1. コマンドセクション

Claude Codeが正しいコマンドを実行できるよう、明示的に記述します：

```markdown
## Commands
- Build: `npm run build`
- Test single: `npm test -- --testPathPattern="path"`
- Lint: `npm run lint`
- Dev: `npm run dev` (port 3000)
```

### 2. アーキテクチャセクション

ディレクトリ構造と各モジュールの役割を説明します：

```markdown
## Architecture
- `src/app/` — Next.js App Router pages
- `src/components/` — React components
- `src/lib/` — Utility functions and shared logic
- `content/` — Markdown content files
```

### 3. 規約セクション

コーディング規約やスタイルガイドを記述します：

```markdown
## Conventions
- Use TypeScript strict mode
- Components: PascalCase function components
- Files: kebab-case
- UI language: Japanese, code comments: English
```

## 配置場所のスコープ

| 場所 | スコープ | 用途 |
|------|---------|------|
| `プロジェクトルート/CLAUDE.md` | プロジェクト全体 | メイン設定 |
| `サブディレクトリ/CLAUDE.md` | そのディレクトリ以下 | サブモジュール固有の設定 |
| `~/.claude/CLAUDE.md` | 全プロジェクト共通 | 個人のグローバル設定 |

## Tips

- **簡潔に書く**: 長すぎるとコンテキストを圧迫します。必要十分な情報に絞りましょう。
- **コマンドは正確に**: コピー＆ペーストで実行できる形で記述します。
- **更新を忘れずに**: プロジェクトの変更に合わせてCLAUDE.mdも更新しましょう。
- **秘密情報は書かない**: APIキーやパスワードは絶対に含めないでください。
