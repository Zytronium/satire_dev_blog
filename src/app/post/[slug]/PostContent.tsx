"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/components/PostGrid";
import Container from "@/components/Container";

// Popup
interface PopupData {
  id: number;
  title: string;
  message: string;
  buttons?: string[];
}

function MalwarePopup({
  popup,
  onDismiss,
}: {
  popup: PopupData;
  onDismiss: (id: number) => void;
}) {
  const buttons = popup.buttons ?? ["OK", "Cancel"];
  return (
    <div className="malware-popup" role="alertdialog" aria-modal="true">
      <div className="malware-popup-titlebar">
        <span>{popup.title}</span>
        <button
          className="malware-popup-close"
          onClick={() => onDismiss(popup.id)}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="malware-popup-body">
        <p>{popup.message}</p>
        <div className="malware-popup-actions">
          {buttons.map((label) => (
            <button key={label} onClick={() => onDismiss(popup.id)}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Config

const SUS_SLUG = "i-clicked-the-worlds-most-suspicious-link-in-existence";

/** scroll progress thresholds → popup content */
const POPUP_TRIGGERS: Array<{ threshold: number } & PopupData> = [
  {
    id: 1,
    threshold: 0.15,
    title: "⚠ Security Warning",
    message:
      "Suspicious script activity detected on your device. Your browser has been flagged. Continue reading at your own risk.",
    buttons: ["Continue Anyway", "Run Away"],
  },
  {
    id: 2,
    threshold: 0.45,
    title: "⚠ 3 Viruses Detected",
    message:
      "Threats found: suspicious_link.exe, darth_vader_trust.dll, mom_walked_in.bat\n\nYour IP address (127.0.0.1) has been logged. This is 100% real and not a joke.",
    buttons: ["Quarantine (doesn't work)", "Ignore (recommended)"],
  },
  {
    id: 3,
    threshold: 0.78,
    title: "⚠ CRITICAL INFECTION",
    message:
      "You are now infected with the link. Please insert a floppy disk with a Linux ISO to gain your freedom before it's too late.",
    buttons: ["I don't have a floppy disk", "OK"],
  },
];

/** scroll depth -> CSS class on the article */
const GLITCH_LEVELS: Array<{ threshold: number; cls: string }> = [
  { threshold: 0.22, cls: "glitch-1" },
  { threshold: 0.48, cls: "glitch-2" },
  { threshold: 0.72, cls: "glitch-3" },
];

// Main component

export default function PostContent({ post, slug, }: { post: Post; slug: string; }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [glitchClass, setGlitchClass] = useState("");
  const [activePopups, setActivePopups] = useState<PopupData[]>([]);
  const triggeredPopups = useRef(new Set<number>());

  const isMalwarePost = slug === SUS_SLUG;

    // Trigger fade-out for "Let Me Be Clear" article
  useEffect(() => {
    if (post?.title === "Let Me Be Clear") {
      const timer = setTimeout(() => setFadeOut(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [post]);

  // Scroll listener for glitch and popups
  useEffect(() => {
    if (!isMalwarePost)
        return;

    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const progress = total > 0 ? scrolled / total : 0;

      // Glitch class: pick the highest qualifying level
      let cls = "";
      for (const { threshold, cls: c } of GLITCH_LEVELS) {
        if (progress >= threshold) cls = c;
      }
      setGlitchClass(cls);

      // Popup triggers
      for (const { threshold, id, title, message, buttons } of POPUP_TRIGGERS) {
        if (progress >= threshold && !triggeredPopups.current.has(id)) {
          triggeredPopups.current.add(id);
          setActivePopups((prev) => [...prev, { id, title, message, buttons }]);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMalwarePost]);

  const dismissPopup = useCallback((id: number) => {
    setActivePopups((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <>
      {/* Malware popup stack: rendered outside the article so glitch doesn't affect them */}
      {isMalwarePost && activePopups.length > 0 && (
        <div className="malware-popup-container" aria-live="assertive">
          {activePopups.map((popup) => (
            <MalwarePopup key={popup.id} popup={popup} onDismiss={dismissPopup} />
          ))}
        </div>
      )}

      <article
        className={[
          "max-w-3xl w-full md:min-w-[60vw] mx-auto px-3 py-6 transition-opacity duration-1000",
          isMalwarePost ? glitchClass : "",
          fadeOut ? "opacity-0" : "opacity-100",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <header className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 text-card-foreground">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
            {post.tags?.length ? (
              <>
                <span>•</span>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-radius bg-popover text-popover-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </header>

        <Container>
          {post.image && (
            <div className="relative w-full h-64 rounded-radius overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground break-words">
            <ReactMarkdown>{post.content ?? ""}</ReactMarkdown>
          </div>

          <footer className="mt-12">
            <Link href="/posts" className="link">
              ← Back to posts
            </Link>
          </footer>
        </Container>
      </article>
    </>
  );
}

function formatDate(d: string) {
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return d;
    dt.setUTCHours(6);
    return dt.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return d;
  }
}
