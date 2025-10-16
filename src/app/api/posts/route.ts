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
  image?: string;
  tags?: string[];
  date?: string;
  content?: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "data", "posts");

function rewriteMarkdownImages(markdown: string, slug: string) {
  return markdown.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/)([^)]+)\)/g,
    (_m, alt, src) => {
      const encoded = encodeURI(src);
      return `![${alt}](/api/posts/${encodeURIComponent(slug)}/images/${encoded})`;
    }
  );
}

/* ---------- fuzzy utilities ---------- */

function normalize(s?: string) {
  return (s ?? "").toLowerCase();
}

/** stopwords to ignore in queries */
const STOPWORDS = new Set([
  "the","a","an","in","on","for","and","or","to","of","is","are","by","with","that","this",
  "these","those","it","its","be","as","at","from","was","were","i","you","he","she","they",
  "we","but","not","so","if","then","else"
]);

function tokenize(q: string) {
  return q
    .toLowerCase()
    .split(/[\s\-_.!,;:?()"'`]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** helper that returns tokens with stopwords removed */
function queryTokens(q: string) {
  const all = tokenize(q);
  const filtered = all.filter((t) => t.length >= 2 && !STOPWORDS.has(t));
  // if filtering removes everything, fall back to short tokens but still dedupe
  return filtered.length ? Array.from(new Set(filtered)) : Array.from(new Set(all));
}

/** Levenshtein distance */
function levenshtein(a: string, b: string) {
  const A = a.split("");
  const B = b.split("");
  const m = A.length;
  const n = B.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const v0 = new Array(n + 1).fill(0);
  const v1 = new Array(n + 1).fill(0);
  for (let j = 0; j <= n; j++) v0[j] = j;
  for (let i = 0; i < m; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < n; j++) {
      const cost = A[i] === B[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= n; j++) v0[j] = v1[j];
  }
  return v0[n];
}

/** check if short token is subsequence of text (chars in order) */
function isSubsequence(token: string, text: string) {
  let ti = 0;
  for (let i = 0; i < text.length && ti < token.length; i++) {
    if (text[i] === token[ti]) ti++;
  }
  return ti === token.length;
}

/**
 * Returns match info and a score for a token against a post.
 * Higher score for title matches, medium for tags/excerpt, low for content.
 */
function scoreTokenAgainstPost(token: string, post: OutPost) {
  const tl = normalize(post.title);
  const ex = normalize(post.excerpt);
  const ct = normalize(post.content);
  const tags = (post.tags ?? []).map((t) => t.toLowerCase());

  // quick substring checks
  if (tl.includes(token)) return { matched: true, score: 40 };
  if (tags.some((t) => t.includes(token))) return { matched: true, score: 30 };
  if (ex.includes(token)) return { matched: true, score: 20 };
  if (ct.includes(token)) return { matched: true, score: 10 };

  // try fuzzy match against words in each field
  const words = new Set<string>();
  tl.split(/\W+/).forEach((w) => w && words.add(w));
  ex.split(/\W+/).forEach((w) => w && words.add(w));
  ct.split(/\W+/).forEach((w) => w && words.add(w));
  tags.forEach((t) => t.split(/\W+/).forEach((w) => w && words.add(w)));

  // allow small edit distance relative to token length
  const maxEdits = Math.max(1, Math.floor(token.length * 0.25));

  for (const w of words) {
    if (!w) continue;
    if (w === token) return { matched: true, score: 35 }; // exact word match
    if (token.length >= 3 && isSubsequence(token, w)) return { matched: true, score: 18 };
    const d = levenshtein(token, w);
    if (d <= maxEdits) {
      const base = w.length >= 6 ? 12 : 22;
      return { matched: true, score: base - d * 3 };
    }
  }

  return { matched: false, score: 0 };
}

/* ---------- route handler ---------- */

export async function GET(req: Request) {
  try {
    const dirents = await fs.readdir(POSTS_DIR, { withFileTypes: true });
    const slugs = dirents.filter((d) => d.isDirectory()).map((d) => d.name);

    const posts: OutPost[] = [];

    for (const slug of slugs) {
      const postDir = path.join(POSTS_DIR, slug);
      const metaPath = path.join(postDir, "meta.json");
      let meta: Meta | null = null;
      try {
        const raw = await fs.readFile(metaPath, "utf8");
        meta = JSON.parse(raw) as Meta;
      } catch {
        continue;
      }

      let content = "";
      const contentPath = path.join(postDir, "content.md");
      try {
        content = await fs.readFile(contentPath, "utf8");
        content = rewriteMarkdownImages(content, slug);
      } catch {
        content = "";
      }

      let imageUrl: string | undefined = undefined;
      if (meta?.image) {
        const img = meta.image;
        if (/^https?:\/\//.test(img) || img.startsWith("/")) {
          imageUrl = img;
        } else {
          imageUrl = `/api/posts/${encodeURIComponent(slug)}/images/${encodeURI(img)}`;
        }
      } else {
        try {
          const entries = await fs.readdir(postDir);
          const thumb = entries.find((e) =>
            /^thumbnail\.(jpg|jpeg|png|webp|gif|avif)$/i.test(e)
          );
          if (thumb) {
            imageUrl = `/api/posts/${encodeURIComponent(slug)}/images/${encodeURI(thumb)}`;
          }
        } catch {}
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

    // parse query
    const url = new URL(req.url);
    const rawQ = url.searchParams.get("query")?.trim() ?? "";
    const q = rawQ;

    // default sorting by date (newest first) before scoring
    posts.sort((a, b) => {
      if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

    if (!q) {
      return NextResponse.json(posts);
    }

    // build token list with stopwords removed where possible
    const tokens = queryTokens(q);
    if (tokens.length === 0) return NextResponse.json(posts);

    // require a high match ratio. adjust this value (0.75) to be stricter or looser.
    const REQUIRED_MATCH_RATIO = 0.75;
    const minMatchesRequired = Math.max(1, Math.ceil(REQUIRED_MATCH_RATIO * tokens.length));

    // score each post and enforce match-count threshold
    const scored = posts
      .map((p) => {
        let totalScore = 0;
        let matchedTokens = 0;
        for (const t of tokens) {
          const info = scoreTokenAgainstPost(t, p);
          if (info.matched) {
            matchedTokens++;
            totalScore += Math.max(0, info.score);
          } else {
            // small penalty preserves ranking among near-misses
            totalScore -= 2;
          }
        }

        // boost posts that matched many tokens
        const tokenRatio = matchedTokens / tokens.length;
        totalScore = totalScore * (0.8 + 0.4 * tokenRatio);

        // small boost for newer posts
        const ageBoost = p.date ? Math.max(0, 1 - (Date.now() - new Date(p.date).getTime()) / (1000 * 60 * 60 * 24 * 365 * 3)) : 0;
        totalScore += ageBoost * 6;

        return { post: p, score: totalScore, matchedTokens };
      })
      // require minimum matched tokens (so almost-all or all tokens must match)
      .filter((s) => s.matchedTokens >= minMatchesRequired && s.score > -100)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.matchedTokens !== a.matchedTokens) return b.matchedTokens - a.matchedTokens;
        if (b.post.date && a.post.date) return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
        return 0;
      });

    const result = scored.map((s) => s.post);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return new Response("Error reading posts", { status: 500 });
  }
}
