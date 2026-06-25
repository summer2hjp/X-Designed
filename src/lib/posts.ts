import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  sticky?: boolean;
  featured?: boolean;
  published: boolean;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface ArchiveItem {
  year: number;
  month: number;
  count: number;
}

export interface SiteStats {
  totalPosts: number;
  totalTags: number;
  totalCategories: number;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

function readPostFile(slug: string): { meta: PostMeta; content: string } | null {
  try {
    const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const source = fs.readFileSync(mdxPath, "utf-8");
    const { data, content } = matter(source);
    return {
      meta: {
        slug,
        title: data.title || slug,
        date: data.date || "",
        updated: data.updated,
        category: data.category || "未分类",
        tags: data.tags || [],
        excerpt: data.excerpt || "",
        cover: data.cover,
        sticky: data.sticky || false,
        featured: data.featured || false,
        published: data.published !== false,
      },
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts: PostMeta[] = [];
  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const result = readPostFile(slug);
    if (result && result.meta.published) {
      posts.push(result.meta);
    }
  }

  // Sticky first, then by date descending
  posts.sort((a, b) => {
    if (a.sticky && !b.sticky) return -1;
    if (!a.sticky && b.sticky) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return posts;
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  return readPostFile(slug);
}

export function getCategories(): Map<string, number> {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const post of posts) {
    map.set(post.category, (map.get(post.category) || 0) + 1);
  }
  return map;
}

export function getTags(): Map<string, number> {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return map;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostNavigation(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w一-鿿]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}

export function getArchiveIndex(): ArchiveItem[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const post of posts) {
    const d = new Date(post.date);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([k, count]) => {
      const [year, month] = k.split("-").map(Number);
      return { year, month, count };
    })
    .sort((a, b) => b.year - a.year || b.month - a.month);
}

export function getSiteStats(): SiteStats {
  const posts = getAllPosts();
  const tags = new Set<string>();
  const categories = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) tags.add(tag);
    categories.add(post.category);
  }
  return {
    totalPosts: posts.length,
    totalTags: tags.size,
    totalCategories: categories.size,
  };
}
