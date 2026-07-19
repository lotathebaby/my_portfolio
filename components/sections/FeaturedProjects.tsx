import { ArrowRight } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { LinkButton } from "@/components/ui/Button";
import { getFeaturedProjects } from "@/lib/data/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <Section id="projects" className="border-t border-border">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-ink">
            A few projects across analytics and engineering.
          </h2>
        </div>
        <LinkButton href="/projects" variant="secondary">
          Browse all projects
          <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
