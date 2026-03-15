---
title: "「Claude Codeの出力品質を上げたい」CLAUDE.mdに仕込む隠し技"
slug: "claude-md-advanced"
description: "CLAUDE.mdにルールを仕込むことで、Claude Codeの出力品質を劇的に上げるテクニック。"
author: "daigirin"
category: "claude-md"
tags: ["CLAUDE.md", "品質", "テクニック"]
difficulty: "intermediate"
type: "tip"
publishedAt: "2026-03-12"
featured: false
---

## 品質を上げる魔法のセクション

### 「やらないこと」を書く

何をするかより、**何をしないか**の方が効く：

```markdown
## Do NOT
- Do not add comments to obvious code
- Do not create unnecessary abstractions
- Do not add error handling for impossible cases
- Do not modify files outside src/
- Do not install new dependencies without asking
```

### 「こう書いて」の具体例を見せる

```markdown
## Code Style Examples

### Good
const items = data.filter(d => d.active).map(d => d.name)

### Bad (don't do this)
const items = []
for (const d of data) {
  if (d.active) {
    items.push(d.name)
  }
}
```

### 確認ポイントを入れる

```markdown
## Before Committing
- Run: npm run build (must pass)
- Run: npm run lint (no warnings)
- Run: npm test (all green)
- Check: No console.log left in code
```

## サブディレクトリCLAUDE.md

特定のディレクトリだけ別ルールにしたい場合：

```
project/
├── CLAUDE.md          ← 全体ルール
├── src/
│   └── CLAUDE.md      ← src/以下だけの追加ルール
└── tests/
    └── CLAUDE.md      ← テスト固有のルール
```

`src/CLAUDE.md` の例：

```markdown
## Rules for src/
- All files must be TypeScript (.ts or .tsx)
- No default exports (use named exports)
- Components must have Props type defined
```

## CLAUDE.mdの更新もClaude Codeに任せる

```
今のプロジェクトの状態に合わせてCLAUDE.mdを更新して。
新しく追加した機能やコマンドも反映して。
```

```
CLAUDE.mdが古くなってる気がする。
実際のコードと照らし合わせて、
不正確な部分を修正して。
```

CLAUDE.md自体のメンテもClaude Codeに丸投げできる。
