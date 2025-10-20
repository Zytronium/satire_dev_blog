"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Lamphome } from "@/components/ui/lamphome";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import "./globals.css";
import Flexbox from "@/components/Flexbox";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const metadata = [
    {
      name: "Home",
      path: `/`,
      title: '<h1>Console.blog("Fixed the Bug (with duct tape)");</h1>',
      description:
        "As it turns out, the bug was caused by a real life insect crawling around inside the computer tower, so I duct taped it to the inner walls where it can't create new electrical pathways inside the hardware anymore.",
    },
    { name: "Browse Posts", path: `/posts`, title: "Blog Posts", description: "" },
    { name: "About", path: `/about`, title: "About", description: "This page is currently under construction" },
    { name: "Admin Panel", path: `/adminpanel`, title: "AdminPanel", description: "Hey! You're not supposed to be here!" },
  ];

  const lamphomeMeta = metadata.find((item) => item.path === pathname);
  const lamphomeTitle = lamphomeMeta?.title ?? "";

  useEffect(() => {
    const postMatch = pathname?.match(/^\/post\/([^/]+)\/?$/);
    // Home page: keep the original default title
    if (pathname === "/") {
      document.title = 'console.blog("Fixed the Bug (with duct tape)");';
      return;
    }
    // Post pages: let the individual post control title/meta via its own Head
    if (postMatch) {
      return;
    }

    // Post page: /post/[slug] -> set to the post title (fetch posts API)
    if (postMatch) {
      const slug = decodeURIComponent(postMatch[1]);
      (async () => {
        try {
          const res = await fetch("/api/posts");
          if (!res.ok) throw new Error("failed to fetch posts");
          const posts: Array<{ slug?: string; title?: string }> = await res.json();
          const found = posts.find((p) => p.slug === slug);
          if (found && found.title) {
            document.title = String(found.title);
            return;
          }
        } catch {
          /* fallthrough to fallback */
        }
        // fallback if post not found
        const label = lamphomeTitle || pathname || slug;
        document.title = `console.blog(${JSON.stringify(String(label))});`;
      })();
      return;
    }

    // Anything else: use lamphomeTitle wrapped in console.blog("...")
    const label = lamphomeTitle || pathname || "";
    document.title = `console.blog(${JSON.stringify(String(label))});`;
  }, [pathname, lamphomeTitle]);

  return (
      <html lang="en" suppressHydrationWarning>
      <head />
      <body className="relative min-h-screen overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="fixed inset-0 -z-10">
            <BackgroundMeteors><></></BackgroundMeteors>
          </div>

        <Lamphome
          title={lamphomeTitle}
            description={lamphomeMeta?.description}
          logoSrc="/favicon.ico"
          logoAlt="console.blog() logo"
          navItems={[
            { href: "/", label: "Home" },
            { href: "/posts", label: "Browse" },
            { href: "/about", label: "About" },
            { href: "/adminpanel", label: "Admin Panel" },
          ]}
        >
          <Flexbox col justify="center">
            {children}
          </Flexbox>
        </Lamphome>
      </ThemeProvider>
      {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
      </html>
  );
}
