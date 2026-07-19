import clsx from "clsx";

export function Badge({
  children,
  muted = false,
  className,
}: {
  children: React.ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-mono tracking-tight",
        muted
          ? "border-dashed border-border text-muted"
          : "border-border bg-surface text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
