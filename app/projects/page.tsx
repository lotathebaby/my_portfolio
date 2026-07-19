import type { Metadata } from "next";
import { Eyebrow, Section } from "@/components/ui/Section";
import { ProjectsBrowser } from "@/components/ProjectsBrowser";

export const metadata: Metadata = {
  title: "Projects",
  description: "Analytics and data engineering projects across industries.",
};

export default function ProjectsPage() {
  return (
    <Section className="pt-16">
      <Eyebrow>Projects</Eyebrow>
      <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink">
        Analytics and engineering work, by industry.
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted">
        Filter by industry, then by whether the work is analysis-facing or
        infrastructure-facing.
      </p>

      <div className="mt-10">
        <ProjectsBrowser />
      </div>
    </Section>
  );
}
