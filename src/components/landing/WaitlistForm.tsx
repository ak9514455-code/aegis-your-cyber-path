import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { joinWaitlist } from "@/lib/waitlist.functions";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

export function WaitlistForm({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  const submit = useServerFn(joinWaitlist);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setState("loading");
    try {
      const res = await submit({ data: { email: parsed.data.email } });
      setState("done");
      toast.success(res.alreadyJoined ? "You're already on the list." : "You're on the waitlist.");
    } catch (err) {
      setState("idle");
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "done") {
    return (
      <div className="glass-strong flex items-center gap-3 rounded-2xl px-5 py-4 text-sm text-foreground">
        <CheckCircle2 className="h-5 w-5 text-primary-glow" />
        <span>Thanks — we'll email you when Aegis is ready.</span>
      </div>
    );
  }

  const label = variant === "hero" ? "Get Early Access" : "Join the Waitlist";

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="glass flex w-full flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center sm:gap-0">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          className="w-full flex-1 min-w-0 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn-glow inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70"
        >
          {state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {label}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
