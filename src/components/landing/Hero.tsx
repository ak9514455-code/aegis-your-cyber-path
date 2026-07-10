import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { WaitlistForm } from "./WaitlistForm";
import { MockPathCard } from "./MockPathCard";
import { getWaitlistCount } from "@/lib/waitlist.functions";

export function Hero() {
  const fetchCount = useServerFn(getWaitlistCount);
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    fetchCount().then((r) => setCount(r.count)).catch(() => setCount(0));
  }, [fetchCount]);

  const display = count === null ? 2 : Math.max(2, count);

  return (
    <section id="top" className="relative pt-32 sm:pt-40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-glow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-glow" />
            Now in private beta
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Cybersecurity is overwhelming.{" "}
            <span className="text-gradient">Aegis makes it simple.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            A personal AI learning companion that builds your cybersecurity path, fits into 10 minutes
            a day, and makes sure you never feel lost again.
          </p>
          <div id="waitlist" className="mt-8 max-w-xl">
            <WaitlistForm variant="hero" />
            <p className="mt-3 text-xs text-muted-foreground">
              Join {display.toLocaleString()} cybersecurity learners already waiting.
            </p>
          </div>
        </div>

        <div className="lg:pl-4">
          <MockPathCard />
        </div>
      </div>
    </section>
  );
}
