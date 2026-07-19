"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { ProjectCard } from "@/components/ProjectCard";
import { industries, projects, type Industry, type ProjectType } from "@/lib/data/projects";

type Filter = "All" | ProjectType;
const filters: Filter[] = ["All", "Analytics", "Engineering"];

export function ProjectsBrowser() {
  const [industry, setIndustry] = useState<Industry>(industries[0]);
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    return projects.filter(
      (p) =>
        p.industry === industry && (filter === "All" ? true : p.type === filter)
    );
  }, [industry, filter]);

  return (
    <div>
      {/* Industry tabs */}
      <div
        role="tablist"
        aria-label="Filter projects by industry"
        className="flex flex-wrap gap-2 border-b border-border pb-6"
      >
        {industries.map((ind) => (
          <button
            key={ind}
            role="tab"
            aria-selected={industry === ind}
            onClick={() => {
              setIndustry(ind);
              setFilter("All");
            }}
            className={clsx(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              industry === ind
                ? "bg-ink text-canvas"
                : "text-muted hover:bg-surface-hover hover:text-ink"
            )}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Secondary filter */}
      <div
        role="tablist"
        aria-label="Filter by project type"
        className="mt-6 flex flex-wrap gap-2"
      >
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={clsx(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors",
              filter === f
                ? "border-accent text-accent"
                : "border-border text-muted hover:text-ink"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Results */}
      {visible.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="font-mono text-sm text-muted">
            {filter === "All" ? filter : `${filter} projects`} coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
