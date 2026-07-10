import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl px-5 pb-10">
      <div className="glass flex flex-col items-start justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 ring-1 ring-primary/30">
            <Shield className="h-3.5 w-3.5 text-primary-glow" />
          </span>
          <span className="font-display text-base font-bold text-foreground">Aegis</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built for cybersecurity learners by a cybersecurity learner.
        </p>
        <p className="text-xs text-muted-foreground">© 2026 Aegis</p>
      </div>
    </footer>
  );
}
