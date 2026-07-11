import { Quote } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const quotes = [
  {
    text: "I've bounced between three courses in the last six months and finished none. The idea of a path that just tells me what's next is honestly what I've been missing.",
    author: "Priya S.",
    role: "CS student, self-taught",
  },
  {
    text: "I work full-time and have maybe 20 minutes a day. Every other cybersecurity course expects a weekend. Something built around 10 minutes is exactly the shape I need.",
    author: "Marcus O.",
    role: "IT support, career switcher",
  },
];

export function SocialProof() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="mx-auto mt-32 max-w-6xl px-5 sm:mt-40">
      <div ref={ref} className="reveal">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            What learners are saying
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {quotes.map((q) => (
            <figure key={q.text} className="glass rounded-2xl p-6">
              <Quote className="h-6 w-6 text-primary-glow/70" />
              <blockquote className="mt-4 text-lg leading-relaxed text-foreground">
                "{q.text}"
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                — {q.author}, <span className="text-foreground/80">{q.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
