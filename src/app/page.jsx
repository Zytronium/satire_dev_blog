"use client";

import { useEffect, useState } from "react";
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
          <GlowButton onClick={() => window.location.href = "/posts/preview"} >Browse Posts</GlowButton>
        </div>
      </div>
  );
}
