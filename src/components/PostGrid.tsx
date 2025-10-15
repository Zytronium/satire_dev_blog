"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Flexbox from "./Flexbox";

export type Post = {
  id: string | number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  tags?: string[];
  date?: string; // ISO date or display string
  href?: string;
};

export default function PostGrid({
  posts,
  className = "",
}: {
  posts: Post[];
  className?: string;
}) {
  if (!posts || posts.length === 0) {
    return (
      <div className={`py-12 text-center text-muted-foreground ${className}`}>
        No posts yet.
      </div>
    );
  }

  return (
    <section className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {posts.map((p) => (
        <article
          key={p.id}
          className="bg-card text-card-foreground border border-border rounded-radius overflow-hidden shadow-sm"
          aria-labelledby={`post-title-${p.id}`}
        >
          <PostCard post={p} />
        </article>
      ))}
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  const hasImage = !!post.image;
  return (
    <div className="flex flex-col h-full">
      <Link href={post.slug ? `/post/${post.slug}` : "#"} className="group no-underline">
        <div className="relative w-full h-44 bg-input">
          {hasImage ? (
            <Image
              src={post.image as string}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw, 33vw"
              className="group-hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <svg
                className="w-12 h-12 opacity-60"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 13l2.5-3 3.5 4.5L17 10l4 6H3l5-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between gap-3">
          <div>
            <h3
              id={`post-title-${post.id}`}
              className="text-lg font-medium leading-snug text-card-foreground"
            >
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags?.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-radius bg-popover text-popover-foreground border border-border"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-xs text-muted-foreground">
              {post.date ? formatDate(post.date) : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function formatDate(d: string) {
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return d;
  }
}
