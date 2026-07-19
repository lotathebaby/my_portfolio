import { ArrowRight } from "lucide-react";

// Renders a horizontal pipeline diagram from a "Stage A → Stage B → Stage C"
// style string. Keeps case studies free of placeholder images while still
// giving each project a real architecture visual.
export function ArchitectureDiagram({ note }: { note: string }) {
  const stages = note.split("→").map((s) => s.trim());

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface p-6">
      <div className="flex min-w-max items-stretch gap-3">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex w-44 flex-col justify-center rounded-lg border border-border bg-canvas px-4 py-3">
              <span className="font-mono text-[11px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 text-sm leading-snug text-ink">
                {stage}
              </span>
            </div>
            {i < stages.length - 1 && (
              <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
