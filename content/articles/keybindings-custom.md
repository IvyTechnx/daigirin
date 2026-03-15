---
title: "「Enterで送信されるのが怖い」キーバインドを変える方法"
slug: "keybindings-custom"
description: "誤送信防止のためにEnterを改行にして、Cmd+Enterで送信に変更する方法。"
author: "daigirin"
category: "keybindings"
tags: ["キーバインド", "カスタマイズ", "プロンプト"]
difficulty: "beginner"
type: "recipe"
publishedAt: "2026-03-14"
featured: false
---

## 問題

長いプロンプトを書いてる途中でEnterを押して送信されちゃう。

## 解決

Claude Codeに直接頼む：

```
Enter を改行にして、Cmd+Enter で送信に変えたい。
keybindings.json を設定して。
```

## 手動で設定する場合

```json
// ~/.claude/keybindings.json
{
  "submit": "cmd+enter",
  "newline": "enter"
}
```

## 他のカスタム例

### Vim風にしたい

```
Claude Codeの操作をVim風にしたい。
Escでノーマルモードに入るような操作感にして。
```

### よく使うプロンプトをショートカットに

```
/compact を1キーで呼べるようにしたい。
keybindings.json で設定して。
```

## リセットしたいとき

```
keybindings.json をデフォルトに戻して。
```

または手動で削除：

```bash
rm ~/.claude/keybindings.json
```
