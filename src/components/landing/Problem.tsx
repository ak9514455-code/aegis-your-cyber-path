import { HelpCircle, Clock, Brain } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const cards = [
  {
    icon: HelpCircle,
    title: "Where do I even start?",
    text: "You open Google, hit YouTube, join a Discord — and now there are 47 tabs open and 100 things to learn. Nobody tells you what actually comes first.",
  },
  {
    icon: Clock,
    title: "No time for a 6-hour course",
    text: "You've got 15 minutes between classes or after work. Every course out there assumes you can sit down and grind for the whole weekend.",
  },
  {
    icon: Brain,
    title: "It all falls out of my head",
    text: "You learn something on Monday, feel great about it, and by Friday it's gone. No notes, no review, no way to build on it.",
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
