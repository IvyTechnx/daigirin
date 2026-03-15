---
title: "「デプロイして」でアプリを公開する"
slug: "deploy-app"
description: "VercelやCloudflareへのデプロイもClaude Codeに丸投げ。設定ファイル作成からgh連携まで。"
author: "daigirin"
category: "workflow"
tags: ["デプロイ", "Vercel", "プロンプト"]
difficulty: "beginner"
type: "recipe"
publishedAt: "2026-03-07"
featured: false
---

## Vercelに公開

```
このアプリをVercelにデプロイできるようにして。
必要な設定ファイルと、デプロイ手順を教えて。
```

## もっと雑に

```
これ公開したい。一番簡単な方法で。
```

Claude Codeがプロジェクトの構成を見て、最適なデプロイ先を提案してくれる。

## 静的サイトとして公開

```
このNext.jsアプリを静的エクスポートして、
Vercelにデプロイできるようにして。
next.config.tsにoutput: 'export'を追加して。
```

## 環境変数の設定

```
本番用の環境変数を整理して。
.env.example を作って、何を設定すべきか一覧にして。
```

## カスタムドメイン

```
Vercelにカスタムドメインを設定する手順を教えて。
ドメインは example.com で。
```

## Cloudflare Pagesにデプロイ

```
Vercelじゃなくて Cloudflare Pages にデプロイしたい。
必要な設定変更をして。
```

## GitHub Pagesに公開（無料）

```
このサイトをGitHub Pagesで無料公開したい。
GitHub Actionsのワークフローを作って。
pushしたら自動デプロイされるようにして。
```

## Docker化

```
このアプリをDocker化して。
Dockerfile と docker-compose.yml を作って。
docker compose up で動くようにして。
```

## デプロイ後のチェック

```
デプロイしたサイトを確認して。
（URLを貼付）
表示崩れやリンク切れがないかチェックして。
```

（Playwright MCPサーバーがあると実際にページを開いて確認してくれる）
