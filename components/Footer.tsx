"use client";

import { Github, Linkedin, ArrowUp, Rss } from "lucide-react";
import { siteConfig } from "@/lib/data/config";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between lg:px-8">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-ink"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-ink"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            className="text-muted transition-colors hover:text-ink"
          >
            <Rss className="h-4 w-4" />
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-surface-hover hover:text-ink"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
