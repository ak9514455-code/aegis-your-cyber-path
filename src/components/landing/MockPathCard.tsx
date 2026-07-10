import { CheckCircle2, Circle, Lock, Network, Terminal, Bug, ShieldCheck } from "lucide-react";

const items = [
  { icon: Network, label: "Networking Fundamentals", status: "done", meta: "12 min · complete" },
  { icon: Terminal, label: "Linux for Security", status: "active", meta: "Today · 10 min" },
  { icon: Bug, label: "Ethical Hacking Basics", status: "next", meta: "Up next" },
  { icon: ShieldCheck, label: "Web App Security", status: "locked", meta: "Unlocks Fri" },
];

export function MockPathCard() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl" aria-hidden />
      <div className="glass-strong relative rounded-3xl p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Your path</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-foreground">Beginner · 10 min/day</h3>
          </div>
          <div className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary-glow ring-1 ring-primary/30">
            Day 6 / 30
          </div>
        </div>

        <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-1/5 rounded-full bg-gradient-to-r from-primary to-secondary" />
        </div>

        <ul className="space-y-2.5">
          {items.map((it) => {
            const Icon = it.icon;
            const StatusIcon =
              it.status === "done" ? CheckCircle2 : it.status === "locked" ? Lock : Circle;
            const active = it.status === "active";
            return (
              <li
                key={it.label}
                className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                  active
                    ? "border-primary/40 bg-primary/10"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">
                  <Icon className="h-4 w-4 text-secondary" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{it.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{it.meta}</p>
                </div>
                <StatusIcon
                  className={`h-4 w-4 shrink-0 ${
                    it.status === "done"
                      ? "text-primary-glow"
                      : it.status === "locked"
                        ? "text-muted-foreground"
                        : active
                          ? "text-primary"
                          : "text-muted-foreground/60"
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
