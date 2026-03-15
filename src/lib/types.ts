export type ArticleType = "tip" | "recipe" | "reference";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type CategoryId =
  | "claude-md"
  | "mcp"
  | "prompts"
  | "keybindings"
  | "permissions"
  | "hooks"
  | "workflow"
  | "tips";

export interface ArticleMeta {
  title: string;
  slug: string;
  description: string;
  author: string;
  category: CategoryId;
  tags: string[];
  difficulty: Difficulty;
  type: ArticleType;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
}

export interface Article extends ArticleMeta {
  content: string;
  htmlContent: string;
  readingTime: number;
}

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}
