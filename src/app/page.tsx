import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-6">
      {posts.length === 0 && (
        <div className="rounded-xl border border-zinc-200 p-12 text-center text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          暂无文章
        </div>
      )}
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
