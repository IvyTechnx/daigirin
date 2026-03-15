---
title: "「CIでClaude Codeを使いたい」自動化環境の権限設定"
slug: "permissions-ci"
description: "GitHub ActionsやDocker内でClaude Codeを動かすときの権限モードとセキュリティ設定。"
author: "daigirin"
category: "permissions"
tags: ["権限", "CI", "自動化"]
difficulty: "intermediate"
type: "recipe"
publishedAt: "2026-03-12"
featured: false
---

## CI/自動化での権限モード

人間がYes/Noを押せない環境では、事前に許可ルールを設定する必要がある。

## Don't Ask モード

```bash
claude --mode dontAsk "npm testを実行してレポートして"
```

`dontAsk` モードでは、`allow` に設定したツールだけ実行し、それ以外は自動拒否。

## CI用の設定例

```json
// .claude/settings.json
{
  "permissions": {
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Bash(npm run *)",
      "Bash(npx *)",
      "Bash(git diff *)",
      "Bash(git status)"
    ],
    "deny": [
      "Edit(*)",
      "Write(*)",
      "Bash(git push *)",
      "Bash(rm *)"
    ]
  }
}
```

**読み取り＋テスト実行のみ許可、書き込み全拒否。**

## GitHub Actionsの例

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: |
          claude --mode dontAsk \
            "このPRの変更をレビューして。バグやセキュリティの問題を指摘して。"
```

## Docker内（Bypass）

使い捨てのコンテナ内なら `bypassPermissions` が使える：

```bash
claude --mode bypassPermissions "ビルドして、テスト走らせて、結果を報告して"
```

**本番環境では絶対に使わない。** コンテナが壊れても問題ない環境のみ。

## セットアップもClaude Codeに聞く

```
GitHub ActionsでPR作成時にClaude Codeでコードレビューを自動実行したい。
ワークフローファイルと権限設定を作って。
```
