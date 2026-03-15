---
title: "「画像生成のMCPサーバーのベスプラ教えて」でどこまでいける？"
slug: "image-gen-mcp"
description: "Claude Codeに雑に聞いてMCPサーバーを探す→設定→使うまでの実録。コピペできるプロンプト付き。"
author: "daigirin"
category: "mcp"
tags: ["MCP", "画像生成", "実録", "プロンプト"]
difficulty: "beginner"
type: "recipe"
publishedAt: "2026-03-15"
featured: true
---

## 実際にやってみた

Claude Codeにこう投げた：

```
画像生成できるMCPサーバーのおすすめ教えて。
無料で使えて、設定が簡単なやつがいい。
mcp.jsonの設定まで書いて。
```

## Claude Codeの回答（要約）

ちゃんと候補を出してくれた。Web検索MCPを入れてある場合、最新情報も拾ってくれる。

出てきた候補：
- **mcp-image** — Gemini経由。無料枠あり。設定2行。
- **claude-image-gen** — Geminiベース。Skills連携も可。
- **image-gen-mcp** — マルチプロバイダー。GPT-image-1も使える。

そのまま「じゃあmcp-imageで設定して」と続けたら、mcp.jsonを書いてくれた。

## コピペで使えるプロンプト集

### MCPサーバーを探すとき

```
〇〇ができるMCPサーバーを探して。
条件: 無料 or 安い、設定が楽、メンテされてる。
mcp.jsonの設定例もつけて。
```

### 設定を丸投げするとき

```
このMCPサーバーをセットアップして。
https://github.com/shinpr/mcp-image

グローバル設定（~/.claude/mcp.json）に追加して。
APIキーはGEMINI_API_KEYで環境変数から読むようにして。
```

### 動くか確認するとき

```
さっき設定したimage-gen MCPサーバーが動くか確認して。
テストとして「夕焼けの富士山」の画像を生成して。
```

## つまずいたポイント

Claude Codeを**再起動しないとMCPが反映されない**。これだけ注意。

設定後に「MCPサーバーが見つからない」と言われたら、一度 `/exit` してからもう一度 `claude` で起動し直す。

## 学び

- MCPサーバー探しもClaude Code自身に聞くのが最速
- 「設定まで書いて」と言えば mcp.json をそのまま出してくれる
- Web検索MCP（Brave Search等）を先に入れておくと、最新のMCPサーバーも見つけてくれる
