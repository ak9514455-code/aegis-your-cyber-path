import { Quote } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const quotes = [
  {
    text: "Finally something built for people like me who are learning cybersecurity but have no idea where to go next.",
    author: "Discord user",
    role: "cybersecurity beginner",
  },
  {
    text: "I kept quitting because there was too much to learn. I need something that just tells me what to do next.",
    author: "Discord user",
    role: "fresher",
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
