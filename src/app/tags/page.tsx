import Link from "next/link";
import { getTags } from "@/lib/posts";

export default function TagsPage() {
  const tags = getTags();
  const maxCount = Math.max(...tags.values(), 1);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">标签</h1>
      {tags.size === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400">暂无标签</p>
      )}
      <div className="flex flex-wrap gap-3">
        {Array.from(tags.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([tag, count]) => {
            const ratio = count / maxCount;
            const size = ratio > 0.8 ? "text-xl" : ratio > 0.6 ? "text-lg" : ratio > 0.4 ? "text-base" : "text-sm";
            const weight = ratio > 0.6 ? "font-semibold" : "font-normal";
            return (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className={`${size} ${weight} rounded-full bg-zinc-100 px-4 py-2 text-zinc-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400`}
              >
                {tag}
                <span className="ml-1.5 text-xs text-zinc-400">({count})</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
