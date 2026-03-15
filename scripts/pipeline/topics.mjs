export const topicBacklog = [
  {
    slug: "multi-file-edit",
    title: "「10ファイル同時に直して」←一気に変えるコツ",
    category: "prompts",
    difficulty: "intermediate",
    type: "recipe",
    tags: ["プロンプト", "リファクタリング", "実録"],
    briefing:
      "複数ファイルの同時編集をClaude Codeに頼むときのプロンプトパターン。importの一括変更、コンポーネント分割、型定義の一斉適用など。",
    crawlHints: {
      docPaths: ["claude-code/overview"],
      githubKeywords: ["multi-file", "batch edit"],
      searchTerms: ["claude code multiple files edit"],
    },
  },
  {
    slug: "mcp-database",
    title: "「DBの中身見せて」PostgreSQL MCPでSQL不要",
    category: "mcp",
    difficulty: "beginner",
    type: "recipe",
    tags: ["MCP", "DB", "PostgreSQL", "プロンプト"],
    briefing:
      "PostgreSQLやSQLiteのMCPサーバーを入れて、Claude Codeから自然言語でDBを操作する方法。",
    crawlHints: {
      docPaths: ["claude-code/mcp"],
      githubKeywords: ["mcp", "database", "postgres"],
      searchTerms: ["claude code mcp database postgresql"],
    },
  },
  {
    slug: "claude-md-monorepo",
    title: "「モノレポのCLAUDE.mdどう書く？」ルート vs パッケージ",
    category: "claude-md",
    difficulty: "intermediate",
    type: "tip",
    tags: ["CLAUDE.md", "モノレポ", "設計"],
    briefing:
      "モノレポ構成でのCLAUDE.mdの階層設計。ルートに共通ルール、各パッケージに個別ルール。",
    crawlHints: {
      docPaths: ["claude-code/memory"],
      githubKeywords: ["CLAUDE.md", "monorepo"],
      searchTerms: ["claude code monorepo CLAUDE.md"],
    },
  },
  {
    slug: "error-loop-escape",
    title: "「ずっと同じエラー直してる」ループ脱出法",
    category: "tips",
    difficulty: "beginner",
    type: "tip",
    tags: ["デバッグ", "トラブル", "プロンプト"],
    briefing:
      "Claude Codeが同じエラーを繰り返し修正しては壊すループにハマったとき。/compact、別アプローチ指示、git stash戦略。",
    crawlHints: {
      docPaths: ["claude-code/overview"],
      githubKeywords: ["loop", "error", "fix"],
      searchTerms: ["claude code stuck error loop same fix"],
    },
  },
  {
    slug: "hooks-ci-integration",
    title: "「PRにコメントつけて」Hooks + GitHub Actionsレシピ",
    category: "hooks",
    difficulty: "advanced",
    type: "recipe",
    tags: ["Hooks", "CI", "GitHub Actions", "自動化"],
    briefing:
      "Claude CodeのHooksをCI/CD環境で活用するレシピ。PR自動レビュー、ビルド結果通知。",
    crawlHints: {
      docPaths: ["claude-code/hooks", "claude-code/github-actions"],
      githubKeywords: ["hooks", "CI", "github actions"],
      searchTerms: ["claude code hooks github actions CI"],
    },
  },
  {
    slug: "prompt-context-window",
    title: "「長すぎて読んでくれない」大きいファイルの渡し方",
    category: "prompts",
    difficulty: "intermediate",
    type: "tip",
    tags: ["プロンプト", "コンテキスト", "テクニック"],
    briefing:
      "大きなファイルやログをClaude Codeに効率よく渡すコツ。部分指定、/compact活用、CLAUDE.mdでの前提共有。",
    crawlHints: {
      docPaths: ["claude-code/overview"],
      githubKeywords: ["context", "large file", "token"],
      searchTerms: ["claude code large file context window limit"],
    },
  },
  {
    slug: "mcp-slack-notify",
    title: "「Slackに投げて」MCPサーバーで業務連携",
    category: "mcp",
    difficulty: "beginner",
    type: "recipe",
    tags: ["MCP", "Slack", "業務連携", "プロンプト"],
    briefing:
      "Slack MCPサーバーを設定して、Claude CodeからSlack投稿・チャンネル検索を実現。",
    crawlHints: {
      docPaths: ["claude-code/mcp"],
      githubKeywords: ["mcp", "slack"],
      searchTerms: ["claude code mcp slack server integration"],
    },
  },
  {
    slug: "workflow-branch-strategy",
    title: "「ブランチ切って開発して」Claude Code時代のGitフロー",
    category: "workflow",
    difficulty: "intermediate",
    type: "tip",
    tags: ["Git", "ブランチ", "ワークフロー"],
    briefing:
      "Claude Codeとのペア開発に合ったGitブランチ戦略。feature branch per prompt、実験ブランチ、戻し方。",
    crawlHints: {
      docPaths: ["claude-code/overview"],
      githubKeywords: ["git", "branch", "workflow"],
      searchTerms: ["claude code git branch strategy workflow"],
    },
  },
  {
    slug: "subcommands",
    title: "「/init って何？」サブコマンド全まとめ",
    category: "tips",
    difficulty: "beginner",
    type: "reference",
    tags: ["コマンド", "入門", "リファレンス"],
    briefing:
      "Claude Codeのスラッシュコマンド一覧と使いどころ。覚えるのは5つだけ。",
    crawlHints: {
      docPaths: ["claude-code/overview", "claude-code/cli-usage"],
      githubKeywords: ["slash command", "subcommand", "/init"],
      searchTerms: ["claude code slash commands list /compact /clear /init"],
    },
  },
  {
    slug: "permissions-allowlist",
    title: "「npm installだけは毎回許可したい」AllowListの作り方",
    category: "permissions",
    difficulty: "beginner",
    type: "recipe",
    tags: ["権限", "効率化", "設定"],
    briefing:
      "特定コマンドだけ自動許可する設定方法。npm install, git commit, prettierなどの実用パターン。",
    crawlHints: {
      docPaths: ["claude-code/settings"],
      githubKeywords: ["allow", "permission", "allowlist"],
      searchTerms: ["claude code auto approve allow permission npm install"],
    },
  },
  {
    slug: "prompt-image-input",
    title: "「このスクショの通りにして」画像入力のコツと限界",
    category: "prompts",
    difficulty: "intermediate",
    type: "tip",
    tags: ["スクショ", "画像", "プロンプト", "テクニック"],
    briefing:
      "画像を渡すときの解像度、アノテーション、テキスト補足の最適な組み合わせ。",
    crawlHints: {
      docPaths: ["claude-code/overview"],
      githubKeywords: ["image", "screenshot", "vision"],
      searchTerms: ["claude code screenshot image input best practice"],
    },
  },
  {
    slug: "hooks-test-on-save",
    title: "「変更するたびテスト走らせて」Hooks × テスト自動実行",
    category: "hooks",
    difficulty: "intermediate",
    type: "recipe",
    tags: ["Hooks", "テスト", "自動化"],
    briefing:
      "postToolUseフックでファイル変更検知→関連テスト自動実行。jest --findRelatedTestsとの組み合わせ。",
    crawlHints: {
      docPaths: ["claude-code/hooks"],
      githubKeywords: ["hooks", "test", "postToolUse"],
      searchTerms: ["claude code hooks auto test run save"],
    },
  },
  {
    slug: "workflow-migration",
    title: "「Rails→Next.jsに移行して」大規模マイグレーション術",
    category: "workflow",
    difficulty: "advanced",
    type: "recipe",
    tags: ["マイグレーション", "プロンプト", "実録"],
    briefing:
      "フレームワーク移行やメジャーバージョンアップをClaude Codeに段階的に任せる方法。",
    crawlHints: {
      docPaths: ["claude-code/overview"],
      githubKeywords: ["migration", "upgrade", "refactor"],
      searchTerms: ["claude code migration framework upgrade"],
    },
  },
  {
    slug: "tips-cost-saving",
    title: "「API代がやばい」トークン節約テクニック",
    category: "tips",
    difficulty: "beginner",
    type: "tip",
    tags: ["コスト", "トークン", "効率化"],
    briefing:
      "Claude Codeの利用コストを抑えるための実用テクニック。/compact頻度、CLAUDE.mdの最適化、不要なファイル読み込み防止。",
    crawlHints: {
      docPaths: ["claude-code/overview"],
      githubKeywords: ["cost", "token", "usage"],
      searchTerms: ["claude code cost saving token API expensive"],
    },
  },
  {
    slug: "claude-md-style-guide",
    title: "「コードスタイル統一して」CLAUDE.mdにリンターを仕込む",
    category: "claude-md",
    difficulty: "intermediate",
    type: "recipe",
    tags: ["CLAUDE.md", "リンター", "コードスタイル"],
    briefing:
      "CLAUDE.mdにESLint/Prettierルール、命名規則、ファイル構成ルールを書いてClaude Codeの出力品質を統一する方法。",
    crawlHints: {
      docPaths: ["claude-code/memory"],
      githubKeywords: ["CLAUDE.md", "lint", "style"],
      searchTerms: ["claude code CLAUDE.md style guide linter prettier"],
    },
  },
  {
    slug: "mcp-custom-build",
    title: "「自分のAPIをMCPにしたい」カスタムMCPサーバーの作り方",
    category: "mcp",
    difficulty: "advanced",
    type: "recipe",
    tags: ["MCP", "カスタム", "API", "実録"],
    briefing:
      "MCP SDKを使って社内APIやカスタムツールをMCPサーバーとして公開する方法。TypeScriptでの実装からClaude Code連携まで。",
    crawlHints: {
      docPaths: ["claude-code/mcp"],
      githubKeywords: ["mcp", "sdk", "custom server"],
      searchTerms: ["claude code build custom mcp server sdk typescript"],
    },
  },
];
