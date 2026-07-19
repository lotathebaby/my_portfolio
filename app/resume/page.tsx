import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume for ${siteConfig.name}.`,
};

export default function ResumePage() {
  return (
    <Section className="pt-16">
      <Eyebrow>Resume</Eyebrow>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted">
            {siteConfig.summary}
          </p>
        </div>
        <LinkButton href={siteConfig.resumeFile} variant="primary">
          <Download className="h-4 w-4" />
          Download PDF
        </LinkButton>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-border">
        <object
          data={siteConfig.resumeFile}
          type="application/pdf"
          className="h-[80vh] w-full"
          aria-label={`${siteConfig.name} resume`}
        >
          <div className="flex h-40 items-center justify-center text-sm text-muted">
            Drop your resume PDF at{" "}
            <code className="ml-1 font-mono">{siteConfig.resumeFile}</code> to
            preview it here.
          </div>
        </object>
      </div>
    </Section>
  );
}
