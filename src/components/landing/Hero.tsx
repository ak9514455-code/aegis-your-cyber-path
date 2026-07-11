import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { WaitlistForm } from "./WaitlistForm";
import { AppPreview } from "./AppPreview";
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
            Private beta · waitlist open
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Learn cybersecurity in{" "}
            <span className="text-gradient">10 minutes a day</span>
            {" "}— without the overwhelm.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Aegis is a small AI companion that gives you a real path — Networking, Linux, ethical hacking — in the right order,
            one focused session at a time. Built by a learner who got tired of quitting courses.
          </p>
          <div id="waitlist" className="mt-8 max-w-xl">
            <WaitlistForm variant="hero" />
            <p className="mt-3 text-xs text-muted-foreground">
              Join {display.toLocaleString()} cybersecurity learners already waiting.
            </p>
          </div>
        </div>

        <div className="lg:pl-2">
          <AppPreview />
        </div>
      </div>
    </section>
  );
}
