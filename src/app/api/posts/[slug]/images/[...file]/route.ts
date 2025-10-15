import fs from "fs/promises";
import path from "path";
import type { NextRequest } from "next/server";

const POSTS_DIR = path.join(process.cwd(), "src", "data", "posts");

function contentTypeFromExt(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "avif":
      return "image/avif";
    case "svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

export async function GET(request: NextRequest, { params }: { params: { slug: string; file: string[] } }) {
  try {
    const { slug, file } = params;
    if (!slug || !file || file.length === 0) return new Response("Not found", { status: 404 });

    // Reconstruct path (preserves nested paths like images/foo/bar.png)
    const relPath = file.join("/");
    const filePath = path.join(POSTS_DIR, slug, relPath);

    // Security: ensure the resolved path is inside the posts dir for that slug
    const resolved = path.resolve(filePath);
    const allowedBase = path.resolve(path.join(POSTS_DIR, slug));
    if (!resolved.startsWith(allowedBase)) {
      return new Response("Forbidden", { status: 403 });
    }

    const data = await fs.readFile(resolved);
    const ctype = contentTypeFromExt(relPath);
    return new Response(data, { headers: { "Content-Type": ctype } });
  } catch (err) {
    return new Response("Not found", { status: 404 });
  }
}
