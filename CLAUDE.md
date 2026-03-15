# Claude Code Tips — IVYXON

## サイトコンセプト

**「Claude Codeに雑にプロンプトを投げてアプリを作る」実践プロンプト集**

IVYXONブランドのサイドコンテンツとして、Claude Code初級者が「こう投げたらこうなった」を体験できるサイト。

## 記事のディシプリン（絶対守るルール）

### トーン & スタイル

- **カジュアル口調**: 「〜してください」ではなく「〜して」
- **タイトルは雑な質問形**: 「「壊れた。助けて」←これで直る」のような、ユーザーが実際に思うことをそのまま
- **結論ファースト**: 最初に「こう投げろ」を見せる。理由は後
- **コピペ可能**: プロンプト例はそのままClaude Codeに貼れる形式で書く
- **解説より実例**: 「なぜ」より「こう投げたらこうなった」

### 記事に必ず含めるもの

1. **コピペできるプロンプト**（コードブロックで囲む）
2. **「これだけ覚えて」の最小プロンプト**（記事冒頭に）
3. **実践的なユースケース**（抽象論はNG）

### 記事に入れてはいけないもの

- 公式ドキュメントのコピペ（リンクだけ貼る）
- 長い背景説明（「そもそも〇〇とは」は最小限に）
- 設定ファイルのリファレンス的な網羅（よく使うものだけ）
- 「〜しましょう」「〜が重要です」のような教科書口調

### 記事の構成テンプレート

```markdown
## 一番雑な投げ方（最小プロンプト）

## もうちょい具体的に投げるパターン

## 実践例 / 実録

## つまずきポイント（あれば）
```

### カテゴリ別の方針

| カテゴリ | 方針 |
|---------|------|
| prompts | コピペプロンプト集。量が正義 |
| workflow | Git、デプロイなど開発フロー。「丸投げ」感 |
| mcp | 「Claude Codeに聞いて探す→設定させる」の流れ |
| claude-md | 「毎回言うの面倒→書いとけ」のパターン |
| hooks | 「自動化レシピ」。設定JSONをコピペで使える形に |
| permissions | 「うざい確認を減らす」実用パターン |
| keybindings | 「覚えるのはN個だけ」のミニマリスト方針 |
| tips | 上記に入らない実用ネタ |

## 技術スタック

- Next.js 16 (App Router) + Tailwind CSS v4 + shadcn/ui (new-york)
- 静的エクスポート (`output: 'export'`)
- コンテンツ: Markdown + gray-matter + remark/rehype
- デプロイ先: Cloudflare Pages (tips.ivyxon.com)

## コマンド

- Dev: `npm run dev`
- Build: `npm run build`（prebuildで検索インデックス自動生成）
- 検索インデックス: `node scripts/build-search-index.mjs`
- 記事生成: `npm run generate-article`（後述）
- Deploy: `npm run build && wrangler pages deploy out --project-name claude-code-tips`（Git連携なし・手動デプロイ）

## 週次記事生成パイプライン

Anthropic公式ドキュメント・GitHub・コミュニティからクロールし、Claude APIで記事ドラフトを自動生成する。

### 手順

1. **APIキーを有効化**: https://console.anthropic.com → API keys → 該当キーを **Enable**
2. **記事を生成**:
   ```bash
   # バックログ確認
   npm run generate-article -- --list

   # 5記事まとめて生成
   for i in $(seq 5); do node scripts/generate-article.mjs; done
   ```
3. **APIキーを無効化**: Console → API keys → 該当キーを **Disable**
4. **レビュー**: `npm run dev` → ブラウザで目視チェック → 修正
5. **デプロイ**: `npm run build && wrangler pages deploy out --project-name claude-code-tips`

### オプション

| フラグ | 用途 |
|-------|------|
| `--topic <slug>` | 特定トピックを指定 |
| `--category <id>` | カテゴリで絞り込み |
| `--dry-run` | API叩かずにプロンプト確認 |
| `--no-crawl` | クロールをスキップ |
| `--list` | バックログ一覧表示 |

### 構成

- `scripts/generate-article.mjs` — エントリポイント
- `scripts/pipeline/topics.mjs` — トピックバックログ（トピック追加はここ）
- `scripts/pipeline/crawl.mjs` — 3ソース（Anthropic Docs / GitHub / Reddit）クローラー
- `scripts/pipeline/generate.mjs` — Claude APIで記事生成
- `scripts/pipeline/dedup.mjs` — 既存記事との重複チェック
- `scripts/pipeline/cache.mjs` — クロール結果キャッシュ（7日TTL）

## ブランド

- カラー: `#0B6E4F`(primary) / `#00D67E`(accent) / `#0A1F1A`(dark)
- ヘッダー/フッター: IVYXONロゴ (IVY light + XON bold green)
- フッター: ivyxon.com への導線

## 免責事項（サイトおよび記事に適用）

- 本サイトの記事はIVYXON編集部が独自にキュレーションしたものであり、Anthropic社の公式コンテンツではない
- 掲載されているプロンプト例や設定例は執筆時点の動作確認に基づくものであり、Claude Codeのアップデートにより動作しなくなる可能性がある
- 記事中のMCPサーバーやサードパーティツールの利用は各自の責任で行うこと。APIキーの管理、料金の発生、データの取り扱いについてIVYXONは責任を負わない
- 記事中のプロンプトを実行した結果生じたコードの品質、セキュリティ、ライセンス上の問題についてIVYXONは責任を負わない
- 本サイトの内容を商用プロジェクトに適用する場合は、必ず自身でコードレビューとテストを実施すること

## ディレクトリ構成

- `content/articles/` — Markdown記事（frontmatter + 本文）
- `src/app/` — ページ
- `src/components/` — UIコンポーネント
- `src/lib/` — 記事パーサー、型定義、設定
- `scripts/` — ビルドスクリプト
