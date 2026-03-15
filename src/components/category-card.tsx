import Link from "next/link";
import {
  FileText, Server, MessageSquare, Keyboard,
  Shield, Webhook, GitBranch, Lightbulb,
} from "lucide-react";
import { Category } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  FileText, Server, MessageSquare, Keyboard,
  Shield, Webhook, GitBranch, Lightbulb,
};

export function CategoryCard({
  category,
  count,
  compact = false,
}: {
  category: Category;
  count: number;
  compact?: boolean;
}) {
  const Icon = iconMap[category.icon] || FileText;

  if (compact) {
    return (
      <Link href={`/categories/${category.id}`} className="shrink-0">
        <div
          className="group flex h-full w-32 flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{ borderTopWidth: "3px", borderTopColor: category.color }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${category.color}15` }}
          >
            <Icon className="h-5 w-5" style={{ color: category.color }} />
          </div>
          <span className="text-sm font-bold text-card-foreground">
            {category.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {count} articles
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/categories/${category.id}`}>
      <div
        className="group flex h-full flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
        style={{ borderTopWidth: "3px", borderTopColor: category.color }}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <Icon className="h-6 w-6" style={{ color: category.color }} />
        </div>
        <span className="text-base font-bold text-card-foreground">
          {category.label}
        </span>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {category.description}
        </p>
        <span className="mt-auto text-xs font-medium text-primary">
          {count} articles →
        </span>
      </div>
    </Link>
  );
}
