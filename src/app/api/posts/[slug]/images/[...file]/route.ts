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

export async function GET(request: NextRequest, ctx: any) {
  try {
    const params = await ctx?.params ?? {};
    const slug = String(params.slug ?? "");
    const rawFile = params.file;

    const file = Array.isArray(rawFile)
      ? rawFile
      : typeof rawFile === "string"
        ? [rawFile]
        : [];

    if (!slug || file.length === 0) {
      return new Response("Not found", { status: 404 });
    }

    const relPath = file.join("/");
    const filePath = path.join(POSTS_DIR, slug, relPath);

    const resolved = path.resolve(filePath);
    const allowedBase = path.resolve(path.join(POSTS_DIR, slug));
    if (!(resolved === allowedBase || resolved.startsWith(allowedBase + path.sep))) {
      return new Response("Forbidden", { status: 403 });
    }

    const data = await fs.readFile(resolved);
    const ctype = contentTypeFromExt(relPath);

    // Convert Node Buffer -> Uint8Array (ArrayBufferView) so TS accepts it as BodyInit
    return new Response(new Uint8Array(data), { headers: { "Content-Type": ctype } });
  } catch (err) {
    console.error("POSTS image fetch error:", err);
    return new Response("Not found", { status: 404 });
  }
}
