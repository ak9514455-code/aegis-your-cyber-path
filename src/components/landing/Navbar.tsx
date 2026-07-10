import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 z-40 w-full">
      <div className="mx-auto mt-3 flex w-[min(1200px,calc(100%-1.5rem))] items-center justify-between rounded-2xl glass px-4 py-3 sm:px-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Shield className="h-4 w-4 text-primary-glow" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">Aegis</span>
        </a>
        <a
          href="#waitlist"
          className="btn-glow inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Join Waitlist
        </a>
      </div>
    </header>
  );
}
