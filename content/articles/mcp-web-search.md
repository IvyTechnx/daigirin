---
title: "「最新のドキュメント調べて」Web検索MCPで情報を拾わせる"
slug: "mcp-web-search"
description: "Claude Codeにネット検索能力を追加するMCPサーバーの導入と、効果的な使い方。"
author: "daigirin"
category: "mcp"
tags: ["MCP", "Web検索", "プロンプト"]
difficulty: "beginner"
type: "recipe"
publishedAt: "2026-03-11"
featured: false
---

## なぜ必要？

Claude Codeの知識には期限がある。最新のライブラリのバージョン、新しいAPIのドキュメントは知らない。Web検索MCPを入れると、**リアルタイムの情報を拾って回答**してくれる。

## セットアップ

```
Web検索できるMCPサーバーを入れたい。
Brave Search MCPをグローバル設定にセットアップして。
```

## 手動設定

```json
// ~/.claude/mcp.json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-key-here"
      }
    }
  }
}
```

Brave Search APIキーは [brave.com/search/api](https://brave.com/search/api/) で無料取得。

## 使い方

入れたら普通に聞くだけ：

```
Next.js 16の最新のApp Routerのドキュメントを確認して、
dynamic routeの書き方を教えて。
```

```
shadcn/uiの最新バージョンでCalendarコンポーネントの使い方を調べて。
```

```
このエラーの解決法をネットで検索して：
（エラーメッセージ貼付）
```

## 特に便利な場面

| 場面 | プロンプト例 |
|------|-------------|
| ライブラリの最新仕様 | 「Tailwind v4の設定方法を調べて」 |
| エラー解決 | 「このエラーの解決法をネットで検索して」 |
| ベストプラクティス | 「Next.js 16のSEO対策のベスプラを調べて」 |
| 競合調査 | 「同じ機能を持つライブラリを比較して」 |

## Web検索なしでもできること

Claude Codeは自分の知識範囲内なら検索なしで回答できる。MCPなしでも動く。最新情報が必要なときだけ検索MCPの恩恵がある。
