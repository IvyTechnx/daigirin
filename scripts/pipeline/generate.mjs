import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-4-20250514";

function buildSystemPrompt() {
  return `あなたはIVYXON編集部のライターだ。Claude Codeの実践的なTips記事を書く。

## 絶対守るルール

### トーン
- カジュアル口調: 「〜して」「〜だ」「〜だよ」。「〜してください」「〜です」は使わない
- タイトルは雑な質問形。ユーザーが実際に思うことをそのまま書く
- 結論ファースト: 最初にコピペできるプロンプトを見せる。理由は後
- 「〜しましょう」「〜が重要です」のような教科書口調は禁止

### 構成（この順番で書く）
1. ## 一番雑な投げ方
   - コードブロックで囲んだ1-2行のプロンプト
   - 「これだけで動く」的な一言
2. ## もうちょい具体的に投げるパターン
   - 2-3個のバリエーション（コードブロック付き）
3. ## 実践例 / 実録
   - 具体的なユースケース（抽象論は絶対NG）
   - 「投げたらこうなった」の実況形式
4. ## つまずきポイント（該当する場合のみ）
   - よくあるハマりどころと対処法

### 禁止事項
- 「そもそも〇〇とは」のような長い背景説明
- 公式ドキュメントのコピペ（リンクだけ貼る）
- 設定ファイルのリファレンス的な網羅（よく使うものだけ）
- 抽象的な説明（「効率的に」「適切に」etc.）
- 絵文字の使用

### 出力形式
- YAML frontmatter + Markdown本文
- プロンプト例はすべてコードブロック（\`\`\`）で囲む
- 記事は800〜1500文字程度（日本語+コードブロック含む）
- frontmatterのフォーマットは指定の通り正確に出力する`;
}

function buildUserPrompt(topic, sources, existingMetas) {
  const today = new Date().toISOString().split("T")[0];

  const existingList = existingMetas
    .map((m) => `- ${m.slug}: "${m.title}" (${m.category})`)
    .join("\n");

  const sourceText =
    sources.length > 0
      ? sources
          .map(
            (s) =>
              `### [${s.source}] ${s.title}\nURL: ${s.url}\n${s.content.slice(0, 2000)}`
          )
          .join("\n\n")
      : "（参考情報なし。一般的な知識で書いて）";

  return `以下のトピックで記事を書いて。

## トピック
- slug: ${topic.slug}
- カテゴリ: ${topic.category}
- 難易度: ${topic.difficulty}
- タイプ: ${topic.type}
- タグ: ${JSON.stringify(topic.tags)}
- ブリーフィング: ${topic.briefing}

## 参考情報（最新のソース）
${sourceText}

## 既存記事（内容が被らないように）
${existingList}

## frontmatterフォーマット（この形式で正確に出力して）
---
title: "雑な質問形のタイトル"
slug: "${topic.slug}"
description: "1行の説明（60-80文字）"
author: "daigirin"
category: "${topic.category}"
tags: ${JSON.stringify(topic.tags)}
difficulty: "${topic.difficulty}"
type: "${topic.type}"
publishedAt: "${today}"
featured: false
---

上記のfrontmatterの後にMarkdown本文を書いて。frontmatterのYAMLは正確にこの形式で。`;
}

export async function generateArticle(topic, sources, existingMetas) {
  const client = new Anthropic();

  console.log(`[generate] Model: ${MODEL}`);
  console.log(`[generate] Topic: ${topic.slug} (${topic.category}, ${topic.difficulty})`);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: buildSystemPrompt(),
    messages: [{ role: "user", content: buildUserPrompt(topic, sources, existingMetas) }],
  });

  const text = response.content[0].text;
  const inputTokens = response.usage?.input_tokens || 0;
  const outputTokens = response.usage?.output_tokens || 0;
  console.log(
    `[generate] Tokens: ${inputTokens} input, ${outputTokens} output`
  );

  return text;
}

export function buildDryRunPrompt(topic, sources, existingMetas) {
  return {
    system: buildSystemPrompt(),
    user: buildUserPrompt(topic, sources, existingMetas),
    model: MODEL,
  };
}
