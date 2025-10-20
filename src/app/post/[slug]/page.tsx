import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Post } from "@/components/PostGrid";
import PostContent from "./PostContent";

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data: Post[] = await res.json();
    return data.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const keywords = [...(post.tags ?? []), "satire", "dev blog"].join(", ");
  const url = `https://satire.zytronium.dev/post/${encodeURIComponent(slug)}`;

  return {
    title: `Console.blog("${post.title}");`,
    description: post.excerpt,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center text-muted-foreground">
        <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
        <Link href="/" className="link">
          Go back home
        </Link>
      </div>
    );
  }

  return <PostContent post={post} slug={slug} />;
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