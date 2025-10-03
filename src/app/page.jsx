"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <Button
            asChild
            size="sm"
            className="w-full md:w-auto bg-black dark:bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 border-0"
          >
            <Link href="/posts">
              Browse Posts
            </Link>
          </Button>
        </div>
      </div>
  );
}
