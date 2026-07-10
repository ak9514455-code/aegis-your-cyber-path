import { Map, Clock, MessageCircle, BrainCircuit } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const features = [
  {
    icon: Map,
    title: "Personalized Learning Path",
    text: "Answer 5 quick questions. Aegis builds a custom roadmap based on your level, goals, and available time. No more guessing what to learn next.",
  },
  {
    icon: Clock,
    title: "Daily Bite Sized Sessions",
    text: "Tell Aegis how much time you have — 10 minutes or 1 hour. Every session is perfectly sized so no time feels wasted.",
  },
  {
    icon: MessageCircle,
    title: "Ask Aegis Anything",
    text: "Confused about a concept? Just ask. Aegis explains everything at your level — no jargon, no confusion, just clarity.",
  },
  {
    icon: BrainCircuit,
    title: "Memory Bank",
    text: "Everything you learn gets saved in your personal knowledge base. Search it anytime. Never forget a concept again.",
  },
];

export function Features() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="mx-auto mt-32 max-w-6xl px-5 sm:mt-40">
      <div ref={ref} className="reveal">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Everything you need to actually learn cybersecurity
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built specifically for learners who feel lost, busy, or overwhelmed.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass group rounded-2xl p-6 transition hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary/10 ring-1 ring-secondary/30">
                    <Icon className="h-5 w-5 text-secondary" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
