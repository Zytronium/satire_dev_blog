"use client";

import React, { useEffect, useState } from "react";
import PostGrid, { Post } from "@/components/PostGrid";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading posts...</p>;

  return (
      <PostGrid posts={posts} className="m-2 md:m-4 lg:m-6 xl:m-8" />
  );
}
