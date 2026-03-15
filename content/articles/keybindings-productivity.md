---
title: "「手が止まる時間を減らしたい」キーボードだけで完結する操作術"
slug: "keybindings-productivity"
description: "マウスを使わずにClaude Codeを操作する。キーボード派のための効率化テクニック。"
author: "daigirin"
category: "keybindings"
tags: ["キーバインド", "効率化", "プロンプト"]
difficulty: "intermediate"
type: "tip"
publishedAt: "2026-03-13"
featured: false
---

## キーボードだけで作業する流れ

### 1. プロンプト入力 → 送信

普通に打って Enter。複数行なら Shift+Enter で改行。

### 2. 生成中に「違う」と思ったら

```
Esc
```

即座に中断。待つ必要なし。

### 3. さっきのプロンプトを修正して再送信

```
↑ キーで前のプロンプトを呼び出し → 編集 → Enter
```

### 4. モードを切り替えたい

```
Shift+Tab で切替（Ask → Auto Accept → Plan → ...）
```

### 5. 画面がゴチャゴチャしてきた

```
Ctrl+L で画面クリア（会話は消えない）
```

## プロンプト履歴を活用する

`↑` キーを連打すると過去のプロンプトを遡れる。

**よく使うパターン：**
1. 長いプロンプトを送信
2. 微修正したい → `↑` で呼び出し
3. 一部を書き換えて再送信

毎回ゼロから打ち直す必要なし。

## ターミナルとの切り替え

Claude Codeはターミナルの中で動いてる。

```
Ctrl+C  → Claude Codeの実行中コマンドを停止
/exit   → Claude Codeを終了してターミナルに戻る
claude  → もう一度Claude Codeを起動
```

## ウィンドウ分割で並行作業

ターミナルを2ペインに分割：
- 左: Claude Code
- 右: `npm run dev` のログ

iTerm2なら `Cmd+D` で縦分割、`Cmd+Shift+D` で横分割。

Claude Codeがコードを書いてる間に、隣のペインでリアルタイムに結果を確認できる。
