"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Post } from "@/components/PostGrid";
import { Search } from "lucide-react";

export default function SearchBar({ onResults }: { onResults: (posts: Post[]) => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    // Avoid requests when query is empty while typing.
    const q = query.trim();
    if (!q) {
      // Clear suggestions and don't fetch.
      setSuggestions([]);
      setLoading(false);
      return;
    }

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      setLoading(true);
      try {
        const url = `/api/posts?query=${encodeURIComponent(q)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("fetch failed");
        const data: Post[] = await res.json();
        setSuggestions(data.slice(0, 8));
      } catch (e) {
        console.error(e);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [query]);

  async function submitQuery(q = query) {
    const text = q.trim();
    setOpen(false);
      setLoading(true);

    try {
      const url = text ? `/api/posts?query=${encodeURIComponent(text)}` : "/api/posts";
      const res = await fetch(url);
      if (!res.ok) throw new Error("failed");
      const data: Post[] = await res.json();
      onResults(data);
      setSuggestions(text ? data.slice(0, 8) : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        className="
          flex items-center gap-3 px-4 py-2 rounded-2xl
          border border-transparent
          backdrop-blur-md
          bg-gradient-to-r from-white/60 to-sky-50/30
          dark:from-[#061025]/60 dark:to-[#1b0f2f]/30
          shadow-[0_6px_24px_rgba(79,70,229,0.12)]
          focus-within:ring-2 focus-within:ring-indigo-400
          transition-colors"
      >
        <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <input
          ref={inputRef}
          aria-label="Search posts"
          className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
          placeholder="Search posts, tags, or content..."
            value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitQuery();
            } else if (e.key === "Escape") {
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
          />
        <button
          onClick={() => submitQuery()}
          className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:opacity-90"
          aria-label="Search"
        >
          {loading ? "…" : "Search"}
        </button>
      </div>

      {open && suggestions.length > 0 && (
        <ul
          className="
            absolute z-40 left-0 right-0 mt-2 max-h-64 overflow-auto
            rounded-xl border border-slate-200 dark:border-slate-800
            bg-white dark:bg-[#07101a] shadow-lg p-2"
        >
          {suggestions.map((s) => (
            <li
              key={s.slug}
              className="cursor-pointer p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              onMouseDown={(e) => {
                // prevent blur before click
                e.preventDefault();
                setQuery(s.title);
                submitQuery(s.title);
              }}
            >
              <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {s.title}
        </div>
              {s.excerpt && (
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {s.excerpt.length > 120 ? s.excerpt.slice(0, 120) + "…" : s.excerpt}
                </div>
              )}
              {s.tags && (
                <div className="mt-1 text-xs text-indigo-600 dark:text-indigo-300">
                  {s.tags.slice(0, 3).join(", ")}
                </div>
        )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
