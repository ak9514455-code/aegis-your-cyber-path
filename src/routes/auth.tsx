import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const fn = mode === "signin" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
      const { error } = await fn.call(supabase.auth, {
        email,
        password,
        ...(mode === "signup"
          ? { options: { emailRedirectTo: window.location.origin + "/admin" } }
          : {}),
      } as any);
      if (error) throw error;
      navigate({ to: "/admin", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" aria-hidden />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Shield className="h-4 w-4 text-primary-glow" />
          </span>
          <span className="font-display text-lg font-bold">Aegis</span>
        </Link>
        <div className="glass-strong w-full rounded-2xl p-6 sm:p-8">
          <h1 className="font-display text-2xl font-bold">
            {mode === "signin" ? "Admin sign in" : "Create admin account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Only the founder account has access to the waitlist.
          </p>
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground ring-1 ring-white/10 focus:outline-none focus:ring-primary/40"
            />
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground ring-1 ring-white/10 focus:outline-none focus:ring-primary/40"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "Need to create the admin account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
        <Link to="/" className="mt-6 text-xs text-muted-foreground hover:text-foreground">← Back to site</Link>
      </div>
    </div>
  );
}