import Link from "next/link";
import { getAllPosts, getArchiveIndex } from "@/lib/posts";

export default function ArchivePage() {
  const archive = getArchiveIndex();
  const posts = getAllPosts();
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">归档</h1>

      {archive.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400">暂无文章</p>
      )}

      <div className="space-y-10">
        {archive.map((item) => {
          const key = `${item.year}-${item.month}`;
          const monthPosts = posts.filter((p) => {
            const d = new Date(p.date);
            return d.getFullYear() === item.year && d.getMonth() + 1 === item.month;
          });

          return (
            <section key={key} id={key}>
              <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {item.year} 年 {monthNames[item.month - 1]}
                <span className="ml-2 text-sm font-normal text-zinc-500">({item.count} 篇)</span>
              </h2>
              <ul className="space-y-2">
                {monthPosts.map((post) => (
                  <li key={post.slug} className="flex items-baseline gap-4">
                    <time className="shrink-0 text-sm text-zinc-400 w-20">
                      {post.date}
                    </time>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-sm text-zinc-700 transition-colors hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
