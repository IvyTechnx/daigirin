---
title: "「プロジェクトごとに権限を変えたい」設定ファイルの使い分け"
slug: "permissions-project"
description: "個人プロジェクトは緩く、仕事のコードは厳しく。プロジェクト別の権限設定。"
author: "daigirin"
category: "permissions"
tags: ["権限", "設定", "プロンプト"]
difficulty: "intermediate"
type: "tip"
publishedAt: "2026-03-13"
featured: false
---

## 設定ファイルの優先順位

```
~/.claude/settings.json        ← グローバル（全プロジェクト）
プロジェクト/.claude/settings.json ← プロジェクト固有（上書き）
```

プロジェクト設定がグローバル設定を上書きする。

## 使い分けの例

### グローバル（ベースライン）

```json
// ~/.claude/settings.json
{
  "defaultMode": "acceptEdits",
  "permissions": {
    "allow": [
      "Read", "Glob", "Grep",
      "Bash(git status)", "Bash(git diff *)"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  }
}
```

### 個人プロジェクト（緩い）

```json
// my-side-project/.claude/settings.json
{
  "permissions": {
    "allow": [
      "Read", "Glob", "Grep",
      "Bash(npm run *)",
      "Bash(npx *)",
      "Edit(src/**)",
      "Write(src/**)"
    ]
  }
}
```

### 仕事のプロジェクト（厳しい）

```json
// work-project/.claude/settings.json
{
  "defaultMode": "default",
  "permissions": {
    "deny": [
      "Bash(git push *)",
      "Bash(rm *)",
      "Edit(.env*)",
      "Edit(migrations/**)"
    ]
  }
}
```

## Claude Codeに設定させる

```
このプロジェクトの権限設定をして。
- src/ 以下の編集は自動許可
- npm コマンドは自動許可
- .env と migrations/ の編集はブロック
- git push はブロック
.claude/settings.json に書いて。
```

## 今の設定を確認する

```
今の権限設定を教えて。
グローバル設定とプロジェクト設定の両方見せて。
```
