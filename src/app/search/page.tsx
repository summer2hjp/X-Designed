import SearchForm from "@/components/SearchForm";
import { getAllPosts } from "@/lib/posts";

export default function SearchPage(props: { searchParams: Promise<{ q?: string }> }) {
  const posts = getAllPosts();

  // Build search index — server-rendered into a JSON script tag
  const searchIndex = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    date: p.date,
  }));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">搜索</h1>

      {/* Embed search index */}
      <script
        id="search-index"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchIndex) }}
      />

      {/* Client-side search form — reads from window.__SEARCH_INDEX__ */}
      <SearchForm initialQuery="" />
    </div>
  );
}
