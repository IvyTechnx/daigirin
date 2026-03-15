---
title: "安全な権限設定とパーミッションモード"
slug: "permission-settings"
description: "Claude Codeのパーミッションモードの使い分けと、プロジェクトごとの安全な権限設定方法を解説します。"
author: "daigirin"
category: "permissions"
tags: ["権限", "セキュリティ", "設定"]
difficulty: "beginner"
type: "tip"
publishedAt: "2026-03-12"
featured: false
---

## パーミッションモードとは

Claude Codeには5つのパーミッションモードがあり、Claudeの自律度を制御します。

## 5つのモード

### 1. Ask Permissions（デフォルト）

すべてのファイル編集とコマンド実行前に確認を求めます。

```
適用場面: 新しいプロジェクト、重要なコードベース
切替方法: Shift+Tab で切替
```

**メリット**: 最も安全。すべての変更を事前確認できる。
**デメリット**: 承認の手間がかかる。

### 2. Auto Accept Edits

ファイル編集は自動承認、ターミナルコマンドは確認あり。

```
適用場面: 信頼できるプロジェクトでの通常開発
```

**メリット**: 編集の流れが途切れない。コマンド実行は引き続き安全。

### 3. Plan Mode

分析と計画のみ。ファイル変更やコマンド実行は一切行いません。

```
適用場面: 大規模リファクタリングの事前検討、コードレビュー
```

**メリット**: 安全にアーキテクチャ検討ができる。

### 4. Don't Ask

事前に許可したツール以外はすべて自動拒否。

```
適用場面: CI/CD環境、限定的な自動化タスク
設定方法: /permissions で許可リストを管理
```

### 5. Bypass Permissions

すべての確認をスキップ。**サンドボックス環境専用**。

```
適用場面: Docker コンテナ内、使い捨て環境
⚠️ 本番環境では絶対に使用しないこと
```

## 設定ファイルでのデフォルト指定

```json
// ~/.claude/settings.json
{
  "defaultMode": "acceptEdits"
}
```

## 許可ルールの設定

`/permissions`コマンドで、特定のツールやファイルパターンに対する許可ルールを設定できます：

```json
// .claude/settings.json（プロジェクト設定）
{
  "permissions": {
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Bash(npm run *)",
      "Edit(src/**)"
    ],
    "deny": [
      "Bash(rm *)",
      "Bash(git push *)"
    ]
  }
}
```

## 推奨設定フロー

1. **新規プロジェクト**: Ask Permissions で始める
2. **慣れてきたら**: Auto Accept Edits に切替
3. **大きな変更前**: Plan Mode で計画を立てる
4. **許可ルール設定**: よく使うコマンドを `/permissions` で許可
