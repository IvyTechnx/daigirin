import { Category, Author } from "./types";

export const siteConfig = {
  name: "Claude Code Tips",
  subtitle: "Practical Prompt Collection",
  description:
    "Claude Codeに雑に投げてアプリを作る。コピペで使える実践プロンプト集。",
  url: "https://tips.ivyxon.com",
};

export const categories: Category[] = [
  {
    id: "claude-md",
    label: "CLAUDE.md",
    icon: "FileText",
    color: "#0B6E4F",
    description: "プロジェクト設定ファイルの書き方と活用パターン",
  },
  {
    id: "mcp",
    label: "MCPサーバー",
    icon: "Server",
    color: "#0891B2",
    description: "Model Context Protocolサーバーの設定と活用",
  },
  {
    id: "prompts",
    label: "プロンプト実例",
    icon: "MessageSquare",
    color: "#00D67E",
    description: "コピペで使える実践プロンプト集",
  },
  {
    id: "keybindings",
    label: "キーバインド",
    icon: "Keyboard",
    color: "#14B8A6",
    description: "キーボードショートカットのカスタマイズ",
  },
  {
    id: "permissions",
    label: "権限設定",
    icon: "Shield",
    color: "#D97706",
    description: "パーミッションモードとセキュリティ設定",
  },
  {
    id: "hooks",
    label: "Hooks",
    icon: "Webhook",
    color: "#134E3A",
    description: "フックによる自動化とカスタムワークフロー",
  },
  {
    id: "workflow",
    label: "ワークフロー",
    icon: "GitBranch",
    color: "#0E7490",
    description: "Git、デプロイ、開発フローの効率化",
  },
  {
    id: "tips",
    label: "一般Tips",
    icon: "Lightbulb",
    color: "#4B5563",
    description: "知っておくと便利な一般的なTips",
  },
];

export const authors: Author[] = [
  {
    id: "daigirin",
    name: "IVYXON編集部",
    bio: "Claude Code実践プロンプトのキュレーションチーム",
  },
];

export const difficultyConfig = {
  beginner: { label: "初級", color: "#00D67E", bgClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
  intermediate: { label: "中級", color: "#D97706", bgClass: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
  advanced: { label: "上級", color: "#EF4444", bgClass: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
};

export const articleTypeConfig = {
  tip: { label: "Tip", icon: "💡" },
  recipe: { label: "Recipe", icon: "🧪" },
  reference: { label: "Reference", icon: "📖" },
};
