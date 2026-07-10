import { HelpCircle, Clock, Brain } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const cards = [
  {
    icon: HelpCircle,
    title: "Don't know where to start",
    text: "You open Google and suddenly there are 100 things to learn. Networking, Linux, Python, tools. Nobody tells you what comes first.",
  },
  {
    icon: Clock,
    title: "No time to learn properly",
    text: "You have 15 minutes between classes or after work. Every resource assumes you have hours to sit and study.",
  },
  {
    icon: Brain,
    title: "Keep forgetting what you learned",
    text: "You study something, feel good, come back a week later and it's all gone. No system. No structure.",
  },
];

export function Problem() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="mx-auto mt-32 max-w-6xl px-5 sm:mt-40">
      <div ref={ref} className="reveal">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Sound familiar?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every beginner hits the same three walls. Aegis is built to break them.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="glass group rounded-2xl p-6 transition hover:border-primary/30">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/25 transition group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary-glow" />
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
