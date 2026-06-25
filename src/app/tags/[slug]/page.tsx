import { notFound } from "next/navigation";
import { getAllPosts, getTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return Array.from(getTags().keys()).map((slug) => ({ slug }));
}

export default async function TagPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const decoded = decodeURIComponent(slug);
  const posts = getAllPosts().filter((p) => p.tags.includes(decoded));
  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        标签：{decoded}
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
