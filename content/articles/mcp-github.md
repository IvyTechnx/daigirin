---
title: "「PR見といて」GitHub MCPでコードレビューを丸投げ"
slug: "mcp-github"
description: "GitHub MCPサーバーを入れて、PR作成・レビュー・イシュー管理をClaude Codeの中で完結させる。"
author: "daigirin"
category: "mcp"
tags: ["MCP", "GitHub", "PR", "プロンプト"]
difficulty: "beginner"
type: "recipe"
publishedAt: "2026-03-10"
featured: false
---

## セットアップ

```
GitHub MCPサーバーをセットアップして。
GITHUB_TOKEN は環境変数から読むようにして。
```

## 手動設定

```json
// ~/.claude/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    }
  }
}
```

GitHubのPersonal Access Tokenは Settings > Developer settings > Personal access tokens で発行。

## 使い方

### PRレビュー

```
このPRをレビューして。
https://github.com/user/repo/pull/42
バグ、セキュリティ、パフォーマンスの観点で。
```

### PRレビューにコメント

```
このPRにレビューコメントを投稿して。
気になった点を具体的に。
```

### イシュー確認

```
このリポジトリのオープンなイシューを一覧して。
優先度が高そうなものをピックアップして。
```

### イシューの対応

```
この Issue を解決して。
https://github.com/user/repo/issues/15
コードを修正して、PRを作成して。
```

### リポジトリ検索

```
このリポジトリで認証に関連するコードを全部見つけて。
```

## gh コマンドとの使い分け

GitHub MCPなしでも、`gh` CLIで同じことができる：

```
gh pr view 42 のコメントを見て、指摘事項を対応して。
```

MCPの利点は、Claude Codeがより自然にGitHubのデータにアクセスできること。どちらでもOK。
