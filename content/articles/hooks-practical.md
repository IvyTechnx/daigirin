---
title: "「保存するたびにフォーマットしたい」Hooksで自動化する"
slug: "hooks-practical"
description: "Claude Codeがファイルを編集したら自動でPrettier実行。Hooksの実践レシピ集。"
author: "daigirin"
category: "hooks"
tags: ["Hooks", "自動化", "プロンプト"]
difficulty: "intermediate"
type: "recipe"
publishedAt: "2026-03-14"
featured: false
---

## Hooksとは

Claude Codeがファイルを編集したり、コマンドを実行したりするタイミングで、**自動的にスクリプトを走らせる**仕組み。

## セットアップ方法

Claude Codeに聞くのが一番早い：

```
Hooksを設定して。
ファイルを編集したら自動でPrettierを走らせるようにして。
.claude/settings.json に書いて。
```

## 手動で設定する場合

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

## 実践レシピ

### レシピ1: 自動フォーマット

```json
{
  "matcher": "Edit|Write",
  "command": "npx prettier --write $CLAUDE_FILE_PATH"
}
```

### レシピ2: 自動lint修正

```json
{
  "matcher": "Edit",
  "command": "npx eslint --fix $CLAUDE_FILE_PATH 2>/dev/null || true"
}
```

### レシピ3: 本番DBアクセス防止

```json
{
  "matcher": "Bash",
  "command": "echo $CLAUDE_TOOL_INPUT | grep -q 'production' && echo 'BLOCKED' && exit 1 || exit 0"
}
```

`preToolUse` で exit 1 を返すとコマンド実行をブロックできる。

### レシピ4: 編集通知

```json
{
  "matcher": "Edit|Write",
  "command": "echo '📝 Edited: '$CLAUDE_FILE_PATH"
}
```

## 注意点

- Hookが重いとClaude Codeの応答が遅くなる
- `|| true` をつけないとHook失敗でツールがブロックされる
- Hookの出力はClaude Codeのコンテキストに入る
