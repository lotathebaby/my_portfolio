"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Rss, Send } from "lucide-react";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/config";

const links = [
  { label: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "GitHub", href: siteConfig.social.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
  { label: "Medium", href: siteConfig.social.medium, icon: Rss },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire this up to a form backend (Formspree, Resend, etc.) — kept as a
    // client-side stub so the form is usable out of the box without one.
    setStatus("sent");
  }

  return (
    <Section id="contact" className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-ink">
            Open to new roles and collaborations.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            The fastest way to reach me is email. I'm happy to talk through a
            role, a dataset, or a project idea.
          </p>

          <ul className="mt-8 space-y-3">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4 text-muted" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-surface p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1.5 block text-muted">Name</span>
              <input
                required
                type="text"
                name="name"
                className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-ink outline-none focus-visible:border-accent"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1.5 block text-muted">Email</span>
              <input
                required
                type="email"
                name="email"
                className="w-full rounded-lg border border-border bg-canvas px-3 py-2 text-ink outline-none focus-visible:border-accent"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm">
            <span className="mb-1.5 block text-muted">Message</span>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-canvas px-3 py-2 text-ink outline-none focus-visible:border-accent"
            />
          </label>

          <Button type="submit" className="mt-5 w-full sm:w-auto">
            {status === "sent" ? "Message sent" : "Send message"}
            <Send className="h-3.5 w-3.5" />
          </Button>

          {status === "sent" && (
            <p className="mt-3 text-xs text-muted" role="status">
              Thanks — I'll get back to you soon.
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
