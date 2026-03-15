---
title: "Hooksで実現する自動化ワークフロー"
slug: "hooks-automation"
description: "Claude CodeのHooks機能を使って、ツール実行前後にカスタムスクリプトを自動実行する方法を紹介します。"
author: "daigirin"
category: "hooks"
tags: ["Hooks", "自動化", "ワークフロー"]
difficulty: "intermediate"
type: "recipe"
publishedAt: "2026-03-11"
featured: false
---

## Hooksとは

Hooksは、Claude Codeのツール実行イベントに応じてシェルコマンドを自動実行する仕組みです。コード編集後のフォーマット、コミット前のチェックなど、定型作業を自動化できます。

## 設定場所

```json
// .claude/settings.json
{
  "hooks": {
    "postToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "npx prettier --write $CLAUDE_FILE_PATH"
      }
    ]
  }
}
```

## フックの種類

| フック | タイミング | 用途 |
|--------|-----------|------|
| `preToolUse` | ツール実行前 | バリデーション、確認 |
| `postToolUse` | ツール実行後 | フォーマット、チェック |
| `notification` | 通知時 | 外部連携 |

## 実践レシピ

### 1. 自動フォーマット

ファイル編集後にPrettierを自動実行：

```json
{
  "hooks": {
    "postToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "npx prettier --write $CLAUDE_FILE_PATH"
      }
    ]
  }
}
```

### 2. ESLint自動チェック

TypeScriptファイル編集後にlintチェック：

```json
{
  "hooks": {
    "postToolUse": [
      {
        "matcher": "Edit",
        "command": "npx eslint $CLAUDE_FILE_PATH --fix --quiet 2>/dev/null || true"
      }
    ]
  }
}
```

### 3. 危険なコマンドのブロック

本番データベースへの接続を防止：

```json
{
  "hooks": {
    "preToolUse": [
      {
        "matcher": "Bash",
        "command": "echo $CLAUDE_TOOL_INPUT | grep -q 'production' && echo 'BLOCKED: production access' && exit 1 || exit 0"
      }
    ]
  }
}
```

## 注意点

- フックのコマンドがエラー（exit code != 0）を返すと、ツール実行がブロックされます
- `preToolUse` で exit 1 を返すとツール実行をキャンセルできます
- 重いフックはClaude Codeの応答速度に影響するため、軽量に保ちましょう
- フックの出力はClaude Codeのコンテキストに含まれます
