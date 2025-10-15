"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GlowButton from "@/components/GlowButton";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
      <div className="mt-12">
        <div className="mt-6 flex flex-col items-center gap-4">
          <GlowButton><Link href="/posts" className={"text-black no-underline"}>
            Browse Posts
          </Link></GlowButton>
        </div>
      </div>
  );
}
