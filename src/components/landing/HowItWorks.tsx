import { useReveal } from "@/hooks/use-reveal";

const steps = [
  { n: "01", title: "Tell Aegis where you're at", desc: "5 quick questions about your level, goals, and how much time you actually have." },
  { n: "02", title: "Get a path that makes sense", desc: "A step-by-step roadmap — Networking → Linux → Ethical Hacking — in the right order." },
  { n: "03", title: "Learn in 10-minute sessions", desc: "One focused topic per day. Small enough to actually finish, big enough to add up." },
  { n: "04", title: "Ask when you're stuck", desc: "Aegis remembers what you've learned and explains new stuff in words that connect to it." },
];

export function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="mx-auto mt-32 max-w-6xl px-5 sm:mt-40">
      <div ref={ref} className="reveal">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">How Aegis works</h2>
          <p className="mt-3 text-muted-foreground">Four steps from lost to learning.</p>
        </div>

        <div className="relative mt-14">
          <div
            className="pointer-events-none absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block"
            aria-hidden
          />
          <ol className="grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="glass relative rounded-2xl p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-primary-foreground shadow-[0_0_24px_-4px_oklch(0.65_0.19_255/0.6)]">
                  {s.n}
                </div>
                <p className="font-display text-base font-semibold text-foreground">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
