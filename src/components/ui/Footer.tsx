import Link from "next/link";
import { getCategories } from "@/lib/posts";

function CategoryLinks() {
  const categories = getCategories();
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">分类</h4>
      <ul className="space-y-1.5">
        {Array.from(categories.entries()).map(([cat, count]) => (
          <li key={cat}>
            <Link
              href={`/categories/${encodeURIComponent(cat)}`}
              className="text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
            >
              {cat} ({count})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavLinks() {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">导航</h4>
      <ul className="space-y-1.5">
        {[
          { label: "首页", href: "/" },
          { label: "归档", href: "/archive" },
          { label: "关于", href: "/about" },
          { label: "搜索", href: "/search" },
        ].map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FriendLinks() {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">友链</h4>
      <ul className="space-y-1.5">
        <li>
          <a
            href="https://vercel.blog.cmliussss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
          >
            参考博客
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <CategoryLinks />
          <NavLinks />
          <FriendLinks />
          <div>
            <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">关于</h4>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              基于 Next.js 构建，使用 Tailwind CSS 设计。专注 Web 技术分享。
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-100 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} CM Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
