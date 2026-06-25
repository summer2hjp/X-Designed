import { notFound } from "next/navigation";
import { getAllPosts, getCategories } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return Array.from(getCategories().keys()).map((slug) => ({ slug }));
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const decoded = decodeURIComponent(slug);
  const posts = getAllPosts().filter((p) => p.category === decoded);
  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        分类：{decoded}
      </h1>
      <p className="-mt-4 mb-6 text-sm text-zinc-500">{posts.length} 篇文章</p>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
