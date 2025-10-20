"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/components/PostGrid";
import Container from "@/components/Container";

export default function Page() {
  const { slug } = useParams(); // changed from id → slug
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();
        // match by slug instead of id
        const found = data.find((p) => p.slug === slug);
        setPost(found || null);
      } catch (err) {
        console.error(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) loadPost();
  }, [slug]);

  // Trigger fade-out if title matches
  useEffect(() => {
    if (post?.title === "Let Me Be Clear") {
      const timer = setTimeout(() => setFadeOut(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [post]);

  if (loading)
    return (
      <div
        className="max-w-3xl mx-auto px-6 py-16 text-center text-muted-foreground">
        <p>Loading post...</p>
      </div>
    );

  if (!post) {
    return (
      <div
        className="max-w-3xl mx-auto px-6 py-16 text-center text-muted-foreground">
        <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
        <Link href="/" className="link">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <article
      className={`max-w-3xl min-w-[60vw] mx-auto px-3 py-6 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <header className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-card-foreground">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          {post.tags?.length ? (
            <>
              <span>•</span>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-radius bg-popover text-popover-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </header>

      <Container>
        {post.image && (
          <div className="relative w-full h-64 rounded-radius overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-neutral dark:prose-invert max-w-none text-foreground">
          <ReactMarkdown>{post.content ?? ""}</ReactMarkdown>
        </div>

        <footer className="mt-12">
          <Link href="/posts" className="link">
            ← Back to posts
          </Link>
        </footer>
      </Container>
    </article>
  );
}

function formatDate(d: string) {
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    dt.setUTCHours(6);
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return d;
  }
}
