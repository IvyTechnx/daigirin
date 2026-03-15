---
title: "「やらかしを未然に防ぎたい」Hooksでガードレールを作る"
slug: "hooks-safety"
description: "rm -rfの実行防止、機密ファイルへのアクセスブロックなど、Hooksで安全装置を作る方法。"
author: "daigirin"
category: "hooks"
tags: ["Hooks", "セキュリティ", "自動化"]
difficulty: "intermediate"
type: "recipe"
publishedAt: "2026-03-13"
featured: false
---

## なぜガードレールが必要？

Auto Acceptモードで作業してると、Claude Codeが予期しない操作をすることがある。Hooksで「やってはいけないこと」をブロックできる。

## 危険なコマンドをブロック

```json
{
  "hooks": {
    "preToolUse": [
      {
        "matcher": "Bash",
        "command": "echo $CLAUDE_TOOL_INPUT | grep -qE 'rm -rf|drop table|git push.*--force' && echo 'BLOCKED: Dangerous command' && exit 1 || exit 0"
      }
    ]
  }
}
```

ブロックされるコマンド：
- `rm -rf`
- `drop table`
- `git push --force`

## 機密ファイルの保護

```json
{
  "hooks": {
    "preToolUse": [
      {
        "matcher": "Edit|Write",
        "command": "echo $CLAUDE_FILE_PATH | grep -qE '\\.env|credentials|secret' && echo 'BLOCKED: Sensitive file' && exit 1 || exit 0"
      }
    ]
  }
}
```

`.env`、`credentials`、`secret` を含むファイルの編集をブロック。

## 特定ディレクトリの保護

```json
{
  "matcher": "Edit|Write",
  "command": "echo $CLAUDE_FILE_PATH | grep -q '/migrations/' && echo 'BLOCKED: Migration files are protected' && exit 1 || exit 0"
}
```

マイグレーションファイルの意図しない変更を防止。

## 全部Claude Codeに設定させる

```
Hooksで安全装置を設定して。
以下をブロックしたい:
- rm -rfの実行
- .envファイルの編集
- git push --force
- production を含むコマンドの実行
.claude/settings.json に書いて。
```

## ブロックされたとき

Hookがブロックした場合、Claude Codeに理由が伝わる。必要なら：

```
さっきブロックされたけど、今回は意図的な変更だから許可して。
Hookを一時的に無効化して実行して。
```
