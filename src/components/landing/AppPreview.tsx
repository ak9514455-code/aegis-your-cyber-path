import appPreview from "@/assets/aegis-app-preview.jpg";

export function AppPreview() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-primary/20 blur-3xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b12] shadow-[0_40px_80px_-30px_oklch(0.65_0.19_255/0.5)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-[#0f0f16] px-3.5 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex max-w-xs items-center gap-1.5 truncate rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            app.aegis.dev / today
          </div>
          <div className="w-10" />
        </div>
        <img
          src={appPreview}
          alt="Aegis app: today's 10-minute Linux permissions lesson with the Ask Aegis chat"
          width={1600}
          height={1008}
          className="block h-auto w-full"
        />
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Preview of the Aegis app — currently in private beta.
      </p>
    </div>
  );
}