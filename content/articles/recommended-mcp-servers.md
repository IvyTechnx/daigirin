---
title: "「これ何のMCPサーバー入れればいい？」Claude Codeに聞いてみた"
slug: "recommended-mcp-servers"
description: "MCPサーバー選びもClaude Code自身に丸投げ。実際に聞いたプロンプトと返ってきた答え。"
author: "daigirin"
category: "mcp"
tags: ["MCP", "プロンプト", "実録"]
difficulty: "beginner"
type: "recipe"
publishedAt: "2026-03-14"
featured: false
---

## 聞き方

Claude Codeにこう投げた：

```
今のこのプロジェクトで使うと便利なMCPサーバー教えて。
何ができるようになるかも説明して。
```

**ポイント: 「このプロジェクト」と言うと、Claude Codeが今のコードベースを見て推薦してくれる。**

## もっと具体的に聞くパターン

### Webの情報を調べさせたいとき

```
ネット検索できるMCPサーバー入れたい。
候補を出して、一番おすすめのやつのmcp.jsonを書いて。
```

### DBを操作させたいとき

```
このプロジェクトのSQLiteのDBをClaude Codeから直接操作したい。
MCPサーバーのセットアップまでやって。
```

### デザインデータと連携したいとき

```
FigmaのデザインをコードにするMCPサーバーある？
あれば設定して。
```

## 「入れすぎ注意」と言われた話

10個くらいMCPサーバーを入れたら、Claude Codeに聞いた：

```
MCPサーバー入れすぎて重い気がする。
今有効なMCPサーバーの一覧と、使ってないやつを教えて。
```

返ってきた答え：
- 「以下の3つは過去1週間使われていません」
- 「起動時間がX秒になっています。5個以下にすることを推奨します」

**MCPサーバーの棚卸しもClaude Codeに聞ける。**

## 裏技: MCPサーバーのインストールも丸投げ

```
このMCPサーバーをインストールして動くようにして。
https://github.com/xxxxx/xxxxx
READMEを読んで設定して。
```

GitHubのURLを投げるだけ。READMEを読んで、必要な設定ファイルを書いて、環境変数のテンプレートまで作ってくれる。
