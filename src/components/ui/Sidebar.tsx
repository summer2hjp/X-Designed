import Link from "next/link";
import { getCategories, getTags, getArchiveIndex, getSiteStats } from "@/lib/posts";

function ProfileCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
          CM
        </div>
        <div>
          <div className="font-semibold text-zinc-900 dark:text-zinc-100">CM Blog</div>
          <div className="text-sm text-zinc-500">分享技术 · 推荐好物</div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        专注于 Web 开发、前端技术和开源工具的个人博客。记录学习心得，分享实用资源。
      </p>
    </div>
  );
}

function TagCloud() {
  const tags = getTags();
  const maxCount = Math.max(...tags.values(), 1);
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">标签</h3>
      <div className="flex flex-wrap gap-2">
        {Array.from(tags.entries()).map(([tag, count]) => {
          const ratio = count / maxCount;
          const size = ratio > 0.8 ? "text-sm" : ratio > 0.5 ? "text-xs" : "text-[11px]";
          const weight = ratio > 0.8 ? "font-semibold" : ratio > 0.5 ? "font-medium" : "font-normal";
          return (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className={`${size} ${weight} rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-600 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-400`}
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function ArchiveList() {
  const archive = getArchiveIndex();
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">归档</h3>
      <ul className="space-y-1.5">
        {archive.slice(0, 6).map((item) => (
          <li key={`${item.year}-${item.month}`}>
            <Link
              href={`/archive#${item.year}-${String(item.month).padStart(2, "0")}`}
              className="flex justify-between text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
            >
              <span>{item.year} 年 {monthNames[item.month - 1]}</span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">({item.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SiteStats() {
  const stats = getSiteStats();
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">站点统计</h3>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{stats.totalPosts}</div>
          <div className="text-[11px] text-zinc-500">文章</div>
        </div>
        <div>
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{stats.totalCategories}</div>
          <div className="text-[11px] text-zinc-500">分类</div>
        </div>
        <div>
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{stats.totalTags}</div>
          <div className="text-[11px] text-zinc-500">标签</div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 lg:block">
      <div className="sticky top-20 flex flex-col gap-6">
        <ProfileCard />
        <TagCloud />
        <ArchiveList />
        <SiteStats />
      </div>
    </aside>
  );
}
