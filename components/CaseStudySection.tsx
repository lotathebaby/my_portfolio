export function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {title}
      </h2>
      <div className="mt-4 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink/90">
        {children}
      </div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/90">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
