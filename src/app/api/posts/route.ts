import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

type Meta = {
  id: number | string;
  title: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  date?: string;
};

type OutPost = {
  id: number | string;
  slug: string;
  title: string;
  excerpt?: string;
  image?: string; // url (may be /api/posts/<slug>/images/...)
  tags?: string[];
  date?: string;
  content?: string; // markdown with rewritten image URLs
};

const POSTS_DIR = path.join(process.cwd(), "src", "data", "posts");

function rewriteMarkdownImages(markdown: string, slug: string) {
  // Replace relative image links like ![alt](1.jpg) or ![alt](images/1.jpg)
  // but do not touch absolute URLs or root-absolute (/something).
  return markdown.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/)([^)]+)\)/g,
    (_m, alt, src) => {
      const encoded = encodeURI(src);
      return `![${alt}](/api/posts/${encodeURIComponent(slug)}/images/${encoded})`;
    }
  );
}

export async function GET() {
  try {
    const dirents = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    const slugs = dirents.filter((d) => d.isDirectory()).map((d) => d.name);

    const posts: OutPost[] = [];

    for (const slug of slugs) {
      const postDir = path.join(POSTS_DIR, slug);

      // read meta.json if present
      const metaPath = path.join(postDir, "meta.json");
      let meta: Meta | null = null;
      try {
        const raw = await fs.readFile(metaPath, "utf8");
        meta = JSON.parse(raw) as Meta;
      } catch {
        // skip posts without meta.json
        continue;
      }

      // read content.md if present
      let content = "";
      const contentPath = path.join(postDir, "content.md");
      try {
        content = await fs.readFile(contentPath, "utf8");
        content = rewriteMarkdownImages(content, slug);
      } catch {
        content = "";
      }

      // determine image url: if meta.image exists and is relative, map to api route
      let imageUrl: string | undefined = undefined;
      if (meta?.image) {
        const img = meta.image;
        if (/^https?:\/\//.test(img) || img.startsWith("/")) {
          imageUrl = img;
        } else {
          imageUrl = `/api/posts/${encodeURIComponent(slug)}/images/${encodeURI(img)}`;
        }
      } else {
        // fallback to thumbnail.* detection
        try {
          const entries = await fs.readdir(postDir);
          const thumb = entries.find((e) =>
            /^thumbnail\.(jpg|jpeg|png|webp|gif|avif)$/i.test(e)
          );
          if (thumb) {
            imageUrl = `/api/posts/${encodeURIComponent(slug)}/images/${encodeURI(thumb)}`;
          }
        } catch {
          /* ignore */
        }
      }

      posts.push({
        id: meta.id,
        slug,
        title: meta.title,
        excerpt: meta.excerpt,
        image: imageUrl,
        tags: meta.tags,
        date: meta.date,
        content,
      });
    }

    // sort by date (newest first) if date exists
    posts.sort((a, b) => {
      if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

    return NextResponse.json(posts);
  } catch (err) {
    return new Response("Error reading posts", { status: 500 });
  }
}
