import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-blue-600 border border-accent",
  secondary:
    "bg-transparent text-ink border border-border hover:bg-surface-hover",
  ghost:
    "bg-transparent text-muted hover:text-ink border border-transparent",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(base, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  // Treat http(s) links AND static files (pdf, png, etc.) as plain anchors.
  // Next.js's <Link> intercepts clicks for client-side route navigation,
  // and a static file under /public isn't a route — clicking it would
  // 404 into the app's not-found page instead of just opening the file.
  const isFile = /\.[a-z0-9]+$/i.test(href.split("?")[0]);
  const isExternal = href.startsWith("http") || isFile;
  const classes = clsx(base, variantStyles[variant], className);

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}