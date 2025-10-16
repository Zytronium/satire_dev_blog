"use client";

import React, { useEffect, useState } from "react";
import PostGrid, { Post } from "@/components/PostGrid";
import SearchBar from "@/components/SearchBar";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts(query?: string) {
      try {
      const url = query ? `/api/posts?query=${encodeURIComponent(query)}` : "/api/posts";
      const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      setPosts([]);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    setLoading(true);
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading posts...</p>;

  return (
    <div className="p-4">
      <SearchBar onResults={(data) => setPosts(data)} />
      <div className="mt-6">
      <PostGrid posts={posts} className="m-2 md:m-4 lg:m-6 xl:m-8" />
      </div>
    </div>
  );
}
