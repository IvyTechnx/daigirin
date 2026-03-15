---
title: "「なんか変な回答返ってきた」→これ打って: /compact"
slug: "compact-context-tips"
description: "Claude Codeが迷走し始めたときの対処法。覚えるのはコマンド1つだけ。"
author: "daigirin"
category: "tips"
tags: ["compact", "トラブル", "プロンプト"]
difficulty: "beginner"
type: "tip"
publishedAt: "2026-03-13"
featured: false
---

## 症状

- さっき頼んだのと同じファイルをまた編集しようとする
- 「前に言った〇〇」が通じない
- 的外れなコードを書き始めた
- なんか遅い

## 原因

会話が長くなりすぎて、Claude Codeの記憶がパンクしてる。

## 解決

```
/compact
```

以上。これで会話が要約されて復活する。

## もっと具体的に使うシーン

### アプリ作ってて途中から精度が落ちたとき

```
/compact

ここまでの変更を踏まえて、次はログイン機能を追加して。
```

`/compact` の後に今からやりたいことを書き直すと確実。

### 別の作業に移るとき

```
/clear

（まったく新しい話題ならこっち）
```

### 「これ覚えておいて」を永続化したいとき

```
今の設計方針をCLAUDE.mdに追記して。
そのあと /compact して。
```

CLAUDE.mdに書いておけば `/compact` しても消えない。会話は消えるけど、CLAUDE.mdは毎回読み込まれるから。

## 目安

- 10〜15ターンくらいで一回 `/compact`
- 「あれ？」と思ったら即 `/compact`
- 大きなタスクの切れ目で `/compact`
