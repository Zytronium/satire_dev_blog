// components/GlowButton.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GlowButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl px-6 py-3 font-medium text-white shadow-[0_0_15px_rgba(150,150,255,0.4)]",
        "bg-[linear-gradient(135deg,#c0e0ff,#e0c0ff,#c0e0ff)] bg-[length:200%_200%]",
        "transition-transform duration-200 hover:scale-[1.025]",
        className
      )}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        boxShadow: [
          "0 0 15px rgba(180,200,255,0.75)",
          "0 0 25px rgba(200,180,255,0.9)",
          "0 0 15px rgba(180,200,255,0.75)",
        ],
      }}
      transition={{
        backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
        boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Shine overlay */}
      <span
        className="absolute inset-0 overflow-hidden rounded-2xl before:absolute before:top-0 before:left-[-75%] before:w-[50%] before:h-full before:transform before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent hover:before:animate-[shine_1.2s_ease-in-out] cursor-pointer"
      />
      <span className="">{children}</span>

      <style jsx>{`
          @keyframes shine {
              0% {
                  left: -75%;
              }
              100% {
                  left: 125%;
              }
          }
      `}</style>
    </motion.button>
  );
}
