"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Lamphome } from "@/components/ui/lamphome";
import BackgroundMeteors from "@/components/ui/backgroundmeteors";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const lamphomeTitle = pathname === "/" ? "Fixed the Bug (with duct tape)" : "";
  const lamphomeDescription = pathname === "/" ? "As it turns out, the bug was caused by a real life insect crawling around inside the computer tower, so I duct taped it to the inner walls where it can't create new electrical pathways inside the hardware anymore." : "";

  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <head>
        <title>console.blog("Fixed the Bug (with duct tape)");</title>
      </head>
      <body>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <BackgroundMeteors>
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
          {children}
        </Lamphome>

        </BackgroundMeteors>
      </ThemeProvider>
      </body>
      </html>
    </>
  )
}
