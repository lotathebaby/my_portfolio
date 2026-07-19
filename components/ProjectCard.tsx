"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, Github, ExternalLink, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const isPlanned = (project.status ?? "published") === "planned";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      aria-disabled={isPlanned || undefined}
      className={clsx(
        "group relative flex flex-col rounded-xl border p-6 transition-colors",
        isPlanned
          ? "border-dashed border-border bg-transparent"
          : "border-border bg-surface hover:bg-surface-hover"
      )}
    >
      <div className={clsx("flex items-center gap-2 font-mono text-xs", isPlanned ? "text-muted/70" : "text-muted")}>
        <span>{project.industry}</span>
        <span aria-hidden="true">·</span>
        <span className={isPlanned ? "" : project.type === "Engineering" ? "text-signal" : "text-accent"}>
          {project.type}
        </span>
      </div>

      <h3 className={clsx("mt-3 text-lg font-semibold tracking-tight", isPlanned ? "text-muted" : "text-ink")}>
        {project.title}
      </h3>

      <p className={clsx("mt-2 text-sm leading-relaxed", isPlanned ? "text-muted/70" : "text-muted")}>
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech) => (
          <Badge key={tech} muted={isPlanned} className="text-[11px]">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-border pt-4 text-sm">
        {isPlanned ? (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
            <Lock className="h-3.5 w-3.5" />
            Coming soon
          </span>
        ) : (
          <>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-accent"
            >
              Read case study
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="ml-auto text-muted transition-colors hover:text-ink">
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} className="text-muted transition-colors hover:text-ink">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}