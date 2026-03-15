---
title: "「このAPIにフロントつけて」でフルスタックアプリが生える"
slug: "api-development"
description: "API設計からフロント連携まで、Claude Codeにフルスタック開発を丸投げするプロンプト集。"
author: "daigirin"
category: "prompts"
tags: ["API", "フルスタック", "プロンプト", "実録"]
difficulty: "intermediate"
type: "recipe"
publishedAt: "2026-03-06"
featured: false
---

## APIを作らせる

### REST API

```
ブログ記事のCRUD APIを作って。Next.js App Router の Route Handler で。
エンドポイント: /api/posts
GET（一覧）、POST（作成）、GET/:id（詳細）、PUT/:id（更新）、DELETE/:id（削除）
```

### 外部API連携

```
天気予報APIを使って、今日の天気を返すAPIを作って。
OpenWeather の無料プランで。
APIキーは環境変数から読んで。
```

## APIにフロントをつける

```
さっき作ったAPIに対応するフロント画面を作って。
一覧、詳細、作成フォーム、編集フォーム、削除ボタン。
```

## 一気に全部作る

```
社内の蔵書管理アプリを作って。
- 本の登録（タイトル、著者、ISBN、棚番号）
- 貸出/返却管理
- 検索機能
バックエンドもフロントも全部。Next.js + SQLite。
```

## 既存APIのドキュメント化

```
src/app/api/ 以下のAPIルートを全部読んで、
APIドキュメントを作って。
エンドポイント、メソッド、リクエスト/レスポンス例を一覧で。
```

## 外部APIを叩きたい

```
SlackにメッセージをPostするAPIルートを作って。
Webhook URLは環境変数から。
POSTリクエストでメッセージ本文を受け取る形で。
```

## APIのデバッグ

```
/api/posts にPOSTしたら500エラーが返ってくる。
原因を調べて直して。
```

## 認証をつける

```
このAPIに簡易的な認証をつけて。
APIキー方式でいい。
ヘッダーに X-API-Key を送る形で。
```

## バリデーション追加

```
このAPIのリクエストバリデーションがない。
zodを使って入力チェックを追加して。
エラー時は400で具体的なメッセージを返して。
```
