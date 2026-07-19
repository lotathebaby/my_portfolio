# Data Professional Portfolio

A production-quality personal site built with Next.js (App Router), TypeScript,
Tailwind CSS, and Framer Motion — positioned around data analytics and data
engineering work.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000
3. Build for production:
   ```bash
   npm run build
   npm run start
   ```

Node 18+ is recommended.

## Personalizing the site

Almost everything you need to change lives in two files:

- **`lib/data/config.ts`** — your name, headline, summary, about paragraphs,
  email, social links, and resume file path. Nothing else needs to change for
  a basic rebrand.
- **`lib/data/projects.ts`** — every project on the site. Add a new project by
  appending an object to the `projects` array; the projects browser, industry
  tabs, filters, and case study pages all read from this one file. Add a new
  industry by adding one string to the `industries` array at the top.
- **`lib/data/skills.ts`** — skills grouped by category. Add a skill by
  appending to a category's `items` array. Use `status: "planned"` for a
  skill you're learning but haven't shipped with yet — it renders in a
  muted/dashed style instead of the solid "in production use" style.
- **`public/resume/resume.pdf`** — drop your resume PDF here. The hero's
  "Download Resume" button and the `/resume` page both point at
  `/resume/resume.pdf` by default (configurable in `config.ts`).

## Architecture decisions

- **Single data files, not hardcoded markup.** Projects, skills, and site
  copy are all plain TypeScript data (`lib/data/*.ts`), not JSX. This was the
  brief's explicit requirement — it means adding a project or an industry
  never touches component code.
- **Industry-first project browsing.** `/projects` uses a two-level filter:
  industry tabs (primary) and an Analytics/Engineering filter (secondary).
  An industry with no projects of a given type shows a "coming soon"
  placeholder instead of an empty grid, so the UI never looks broken as you
  add projects unevenly across industries.
- **Case studies as technical documentation.** Each project has a dedicated
  route at `/projects/[slug]` (`app/projects/[slug]/page.tsx`), statically
  generated via `generateStaticParams`. The sections (Overview, Business
  Problem, Objectives, Dataset, Architecture, Data Model, Pipeline,
  Technologies, Implementation, Analysis, Challenges, Lessons Learned, Future
  Improvements) are pulled directly from each project's `caseStudy` object,
  so every case study is structurally consistent without being copy-pasted.
- **No stock imagery.** The hero and the "architecture diagrams" are built
  with typography, CSS, and a small SVG-free flow diagram
  (`components/ArchitectureDiagram.tsx`) that parses a `"Stage A → Stage B"`
  string into a schematic. This keeps the site fast, avoids placeholder
  photos, and means an architecture visual exists for every project without
  needing you to design and upload one.
- **Design tokens as CSS variables**, not hardcoded Tailwind colors. Light
  and dark themes are defined once in `app/globals.css` (`:root` and
  `.dark`), and every component references the semantic tokens (`canvas`,
  `surface`, `ink`, `muted`, `border`, `accent`) rather than raw Tailwind
  color utilities. Theme switching is handled by `next-themes`
  (`components/ThemeProvider.tsx`, `components/ThemeToggle.tsx`), with
  `attribute="class"` matching Tailwind's `darkMode: "class"` config.
- **Typography carries the design.** Per the brief (no photo, no
  illustration), the hero and section headers rely on a type scale (Inter for
  body/display, JetBrains Mono for eyebrows, tags, and technical labels) and
  a faint animated "pipeline field" background (`.pipeline-field` in
  `globals.css`) instead of imagery — a nod to data lineage graphs without
  being a literal illustration.
- **Accessibility built in**: visible focus rings (`:focus-visible` in
  `globals.css`), a skip-to-content link in `app/layout.tsx`, semantic
  landmarks, `prefers-reduced-motion` handling, and accessible labels on
  icon-only buttons (theme toggle, socials, back-to-top).
- **Contact form is a client-side stub.** `components/sections/Contact.tsx`
  has a working form UI but the submit handler just sets local state —
  wire it up to a form backend (Formspree, Resend, a serverless function,
  etc.) when you're ready to accept submissions.

## Folder structure

```
app/
  layout.tsx              Root layout: fonts, theme provider, nav/footer
  page.tsx                 Home page (hero, about, skills, featured projects, contact)
  not-found.tsx             404 page
  projects/
    page.tsx                /projects — industry tabs + filters
    [slug]/page.tsx          Dynamic case study page
  resume/page.tsx            /resume — summary + embedded PDF viewer
  globals.css                 Design tokens (light/dark), base styles
components/
  Navbar.tsx, Footer.tsx, ThemeToggle.tsx, ThemeProvider.tsx
  ProjectCard.tsx              Reusable project card (home + /projects)
  ProjectsBrowser.tsx          Industry tabs + Analytics/Engineering filter
  ArchitectureDiagram.tsx      Text-to-flow-diagram renderer
  CaseStudySection.tsx        Case study section/list primitives
  sections/                   Hero, About, Skills, FeaturedProjects, Contact
  ui/                          Button, Badge, Section/Container/Eyebrow
lib/data/
  config.ts                   Site-wide copy and links — edit this first
  projects.ts                  All project content and types
  skills.ts                    Skill categories
public/resume/                 Put resume.pdf here
```

## Adding a new project

Open `lib/data/projects.ts` and append an object to the `projects` array,
following the `Project` type. At minimum you need `slug`, `title`,
`industry`, `type`, `description`, `businessProblem`, `technologies`,
`skills`, and a `caseStudy` object. Everything else (card display, filtering,
case study routing) works automatically — no other file needs to change.

## Adding a new industry

Add the string to the `Industry` union type and to the `industries` array in
`lib/data/projects.ts`. It will appear as a new tab on `/projects`
immediately, showing "coming soon" placeholders until you tag a project with
it.
