import { Eyebrow, Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/data/config";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,220px)_1fr]">
        <div>
          <Eyebrow>About</Eyebrow>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
          Building data solutions that turn raw information into meaningful insights.
          </h2>
        </div>

        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted">
          {siteConfig.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
