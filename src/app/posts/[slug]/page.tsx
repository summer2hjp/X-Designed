import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  getPostBySlug,
  getAllSlugs,
  getPostNavigation,
  extractHeadings,
} from "@/lib/posts";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.excerpt,
    },
  };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const { prev, next } = getPostNavigation(slug);

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  return (
    <article className="min-w-0 flex-1">
      {/* Post header */}
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {post.meta.category}
          </span>
          <time className="text-xs text-zinc-500">{post.meta.date}</time>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
          {post.meta.title}
        </h1>
        {post.meta.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content layout: article + TOC */}
      <div className="flex gap-8">
        {/* Main content */}
        <div className="prose prose-zinc min-w-0 flex-1 dark:prose-invert max-w-none
          prose-headings:scroll-mt-20
          prose-h1:text-2xl prose-h1:font-bold
          prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-lg prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-2
          prose-p:leading-relaxed prose-p:text-zinc-700 dark:prose-p:text-zinc-300
          prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm dark:prose-code:bg-zinc-800
          prose-pre:rounded-xl prose-pre:bg-zinc-950 prose-pre:text-sm dark:prose-pre:bg-zinc-900
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400
          prose-li:leading-relaxed
          prose-strong:font-semibold
        ">
          {content}
        </div>

        {/* TOC sidebar */}
        {headings.length > 0 && (
          <nav className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-20">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                目录
              </h4>
              <ul className="space-y-1.5 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={`block text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 ${
                        h.level === 2 ? "pl-0" : "pl-4"
                      }`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>

      {/* Prev/Next navigation */}
      <nav className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <div>
          {prev && (
            <div>
              <span className="text-xs text-zinc-500">上一篇</span>
              <Link
                href={`/posts/${prev.slug}`}
                className="mt-1 block text-sm font-medium text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
              >
                {prev.title}
              </Link>
            </div>
          )}
        </div>
        <div className="text-right">
          {next && (
            <div>
              <span className="text-xs text-zinc-500">下一篇</span>
              <Link
                href={`/posts/${next.slug}`}
                className="mt-1 block text-sm font-medium text-zinc-900 transition-colors hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
              >
                {next.title}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </article>
  );
}
