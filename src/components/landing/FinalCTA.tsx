import { WaitlistForm } from "./WaitlistForm";
import { useReveal } from "@/hooks/use-reveal";

export function FinalCTA() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="join" className="mx-auto mt-32 max-w-4xl px-5 sm:mt-40">
      <div ref={ref} className="reveal glass-strong relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" aria-hidden />
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Be the first to try Aegis
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Currently in development. Join the waitlist and get free early access when we launch.
        </p>
        <div className="mx-auto mt-8 max-w-lg">
          <WaitlistForm variant="cta" />
          <p className="mt-3 text-xs text-muted-foreground">No spam. Just updates on our launch.</p>
        </div>
      </div>
    </section>
  );
}
