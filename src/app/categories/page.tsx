import Link from "next/link";
import { getCategories } from "@/lib/posts";

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">分类</h1>
      {categories.size === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400">暂无分类</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from(categories.entries()).map(([cat, count]) => (
          <Link
            key={cat}
            href={`/categories/${encodeURIComponent(cat)}`}
            className="rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{cat}</h2>
            <p className="mt-1 text-sm text-zinc-500">{count} 篇文章</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
