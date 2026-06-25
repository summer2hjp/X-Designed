import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article
      className={`rounded-xl border p-6 transition-shadow hover:shadow-md ${
        post.sticky
          ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      }`}
    >
      {/* Category badge + sticky tag */}
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {post.category}
        </span>
        {post.sticky && (
          <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
            置顶
          </span>
        )}
      </div>

      {/* Title */}
      <Link href={`/posts/${post.slug}`}>
        <h2 className="mb-2 text-xl font-semibold leading-snug text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400">
          {post.title}
        </h2>
      </Link>

      {/* Excerpt */}
      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {post.excerpt}
      </p>

      {/* Meta: date + tags */}
      <div className="flex items-center justify-between">
        <time className="text-xs text-zinc-500 dark:text-zinc-500">
          {post.date}
        </time>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
