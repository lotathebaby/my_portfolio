import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CaseStudySection, BulletList } from "@/components/CaseStudySection";
import { getProjectBySlug, projects, isPublished } from "@/lib/data/projects";

export function generateStaticParams() {
  return projects.filter(isPublished).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <article className="py-16">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All projects
        </Link>

        <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
          <span>{project.industry}</span>
          <span aria-hidden="true">·</span>
          <span className={project.type === "Engineering" ? "text-signal" : "text-accent"}>
            {project.type}
          </span>
        </div>

        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {project.title}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {project.businessProblem}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.github && (
            <LinkButton href={project.github} variant="secondary">
              <Github className="h-4 w-4" />
              View code
            </LinkButton>
          )}
          {project.demo && (
            <LinkButton href={project.demo} variant="secondary">
              <ExternalLink className="h-4 w-4" />
              Live demo
            </LinkButton>
          )}
        </div>
      </Container>

      <Container className="mt-14 max-w-3xl">
        <CaseStudySection title="Overview">
          <p>{caseStudy.overview}</p>
        </CaseStudySection>

        <CaseStudySection title="Business Problem">
          <p>{project.businessProblem}</p>
        </CaseStudySection>

        <CaseStudySection title="Objectives">
          <BulletList items={caseStudy.objectives} />
        </CaseStudySection>

        <CaseStudySection title="Dataset">
          <p>{caseStudy.dataset}</p>
        </CaseStudySection>

        <CaseStudySection title="Architecture">
          <ArchitectureDiagram note={caseStudy.architectureNote} />
        </CaseStudySection>

        {caseStudy.dataModel && (
          <CaseStudySection title="Data Model">
            <p>{caseStudy.dataModel}</p>
          </CaseStudySection>
        )}

        {caseStudy.pipeline && (
          <CaseStudySection title="Pipeline">
            <p>{caseStudy.pipeline}</p>
          </CaseStudySection>
        )}

        <CaseStudySection title="Technologies Used">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection title="Implementation">
          <BulletList items={caseStudy.implementation} />
        </CaseStudySection>

        {caseStudy.analysis && (
          <CaseStudySection title="Analysis">
            <BulletList items={caseStudy.analysis} />
          </CaseStudySection>
        )}

        <CaseStudySection title="Challenges">
          <BulletList items={caseStudy.challenges} />
        </CaseStudySection>

        <CaseStudySection title="Lessons Learned">
          <BulletList items={caseStudy.lessonsLearned} />
        </CaseStudySection>

        <CaseStudySection title="Future Improvements">
          <BulletList items={caseStudy.futureImprovements} />
        </CaseStudySection>

        <CaseStudySection title="Skills Demonstrated">
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} muted>
                {skill}
              </Badge>
            ))}
          </div>
        </CaseStudySection>
      </Container>
    </article>
  );
}
