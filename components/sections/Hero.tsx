"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { siteConfig } from "@/lib/data/config";

export function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-border">
      {/* Signature motif: a faint lineage-graph field, evoking pipeline nodes
          without illustrating anything literal. Pure CSS, no imagery. */}
      <div
        aria-hidden="true"
        className="pipeline-field absolute inset-0 animate-drift"
      />

      <Container className="relative py-28 sm:py-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-muted"
        >
          {siteConfig.name} . {siteConfig.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-6xl"
        >
          {siteConfig.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl text-base leading-relaxed text-muted"
        >
          {siteConfig.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <LinkButton href="/projects" variant="primary">
            View Projects
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
        <a href={siteConfig.resumeFile}
  download
  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-accent"
>
  Download Resume
  <Download className="h-4 w-4" />
</a>
        </motion.div>
      </Container>
    </div>
  );
}
