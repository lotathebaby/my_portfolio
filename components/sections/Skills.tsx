"use client";

import { motion } from "framer-motion";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { skillCategories } from "@/lib/data/skills";

export function Skills() {
  return (
    <Section id="skills" className="border-t border-border">
      <Eyebrow>Skills</Eyebrow>
      <h2 className="max-w-xl text-2xl font-semibold tracking-tight text-ink">
        Capabilities, organized by what they are for.
      </h2>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="text-sm font-semibold text-ink">{category.title}</h3>
            <p className="mt-1 text-sm text-muted">{category.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {category.items.map((skill) => (
                <Badge key={skill.name} muted={skill.status === "planned"}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
