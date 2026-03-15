---
title: "「毎回『許可しますか？』がうざい」許可ルールの設定方法"
slug: "permissions-practical"
description: "よく使うコマンドを事前に許可して、確認ダイアログを減らす方法。"
author: "daigirin"
category: "permissions"
tags: ["権限", "効率化", "プロンプト"]
difficulty: "beginner"
type: "recipe"
publishedAt: "2026-03-14"
featured: false
---

## 問題

`npm run dev` を実行するたびに「許可しますか？」と聞かれる。毎回Yesを押すのが面倒。

## 解決: 許可ルールを設定

Claude Codeに頼む：

```
npm run dev, npm run build, npm test は毎回許可なしで実行できるようにして。
/permissions で設定して。
```

## 手動で設定する場合

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
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Edit(src/**)"
    ]
  }
}
```

## よく使う許可パターン

### 開発コマンド全許可

```json
"allow": [
  "Bash(npm run *)",
  "Bash(npx *)",
  "Bash(node *)"
]
```

### Git読み取り許可（書き込みは確認）

```json
"allow": [
  "Bash(git status)",
  "Bash(git diff *)",
  "Bash(git log *)",
  "Bash(git branch *)"
]
```

### src/ 以下の編集を自動許可

```json
"allow": [
  "Edit(src/**)",
  "Write(src/**)"
]
```

### 拒否ルール

```json
"deny": [
  "Bash(rm -rf *)",
  "Bash(git push --force *)",
  "Edit(.env*)"
]
```

## パーミッションモードとの組み合わせ

| モード | 許可ルール | 結果 |
|--------|-----------|------|
| Ask | allow設定あり | allowに合致する操作だけ自動許可 |
| Auto Accept | deny設定あり | denyに合致する操作だけブロック |
| Don't Ask | allow設定あり | allowのみ実行、他は全拒否 |

**おすすめ: Auto Accept + deny で危険操作だけブロック**
