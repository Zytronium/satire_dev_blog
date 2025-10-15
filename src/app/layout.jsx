"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Lamphome } from "@/components/ui/lamphome";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import "./globals.css";
import Flexbox from "@/components/Flexbox";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const metadata = [
    {
      name: "Home",
      path: `/`,
      title: "<h1>Console.blog(\"Fixed the Bug (with duct tape)\");</h1>",
      description: "As it turns out, the bug was caused by a real life insect crawling around inside the computer tower, so I duct taped it to the inner walls where it can't create new electrical pathways inside the hardware anymore."
    },
    {
      name: "Browse Posts",
      path: `/posts`,
      title: "Blog Posts",
      description: "This page is currently under construction"
    },
    {
      name: "Blog Posts Preview",
      path: `/posts/preview`,
      title: "Blog Posts",
      description: ""
    },
    {
      name: "About",
      path: `/about`,
      title: "About",
      description: "This page is currently under construction"
    },
    {
      name: "Admin Panel",
      path: `/adminpanel`,
      title: "AdminPanel",
      description: "Hey! You're not supposed to be here!"
    },
  ];
  const lamphomeTitle = metadata.find(item => item.path === pathname)?.title;
  const lamphomeDescription = metadata.find(item => item.path === pathname)?.description;

  return (
      <html lang="en" suppressHydrationWarning>
      <head>
        <title>console.blog("Fixed the Bug (with duct tape)");</title>
      </head>
      <body className="relative min-h-screen overflow-x-hidden">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
          {/* Fixed, full-screen background layer */}
          <div className="fixed inset-0 -z-10">
            <BackgroundMeteors />
          </div>

          {/* Foreground layout */}
        <Lamphome
          title={lamphomeTitle}
          description={lamphomeDescription}
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
      </body>
      </html>
  );
}
