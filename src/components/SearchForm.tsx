"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface SearchItem {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
}

declare global {
  interface Window {
    __SEARCH_INDEX__?: SearchItem[];
  }
}

interface SearchFormProps {
  modal?: boolean;
  onClose?: () => void;
  initialQuery?: string;
}

export default function SearchForm({ modal, onClose, initialQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modal && inputRef.current) inputRef.current.focus();
  }, [modal]);

  const doSearch = useCallback((q: string) => {
    const index = window.__SEARCH_INDEX__ || [];
    if (!q.trim()) {
      setResults(index.slice(0, 5));
      return;
    }
    const lower = q.toLowerCase();
    const filtered = index.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.excerpt.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower) ||
        item.tags.some((t: string) => t.toLowerCase().includes(lower))
    );
    setResults(filtered.slice(0, 10));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 150);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  useEffect(() => {
    if (!modal && query) {
      const params = new URLSearchParams(window.location.search);
      if (params.get("q") !== query) {
        window.history.replaceState(null, "", `?q=${encodeURIComponent(query)}`);
      }
    }
  }, [query, modal]);

  return (
    <div className={modal ? "fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24" : ""}>
      <div className={modal ? "w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900" : ""}>
        {modal && (
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">搜索</h3>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="关闭搜索"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文章..."
              className={`w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 ${
                modal ? "" : "mb-6"
              }`}
            />
          </div>
        </form>

        {modal && results.length > 0 && (
          <ul className="mt-4 space-y-1">
            {results.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/posts/${item.slug}`}
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-500">{item.date}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <p className="mt-4 text-sm text-zinc-500">未找到匹配结果</p>
        )}
      </div>
    </div>
  );
}
