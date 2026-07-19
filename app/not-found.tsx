import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        This page doesn't exist.
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The project or page you're looking for may have moved.
      </p>
      <LinkButton href="/" variant="primary" className="mt-6">
        Back to home
      </LinkButton>
    </Container>
  );
}
