import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { getCategoryCounts } from "@/lib/articles";
import { categories } from "@/lib/config";

export const metadata: Metadata = {
  title: "カテゴリ一覧",
};

export default function CategoriesPage() {
  const counts = getCategoryCounts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">カテゴリ一覧</h1>
      <p className="mb-8 text-muted-foreground">
        Claude Codeのスキルを8つのカテゴリに分類しています。
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col">
            <CategoryCard category={cat} count={counts.get(cat.id) || 0} />
            <p className="mt-2 px-1 text-xs text-muted-foreground">
              {cat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
