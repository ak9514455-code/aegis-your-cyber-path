import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin, listWaitlist, deleteWaitlistEntry } from "@/lib/admin.functions";
import { Shield, LogOut, Trash2, Loader2, Mail } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const checkAdmin = useServerFn(isAdmin);
  const fetchList = useServerFn(listWaitlist);
  const removeEntry = useServerFn(deleteWaitlistEntry);

  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin() });
  const listQ = useQuery({
    queryKey: ["waitlist"],
    queryFn: () => fetchList(),
    enabled: adminQ.data?.isAdmin === true,
  });
  const del = useMutation({
    mutationFn: (id: string) => removeEntry({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["waitlist"] }),
  });

  useEffect(() => {
    if (adminQ.data && !adminQ.data.isAdmin) {
      // signed in but not admin
    }
  }, [adminQ.data]);

  async function signOut() {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/auth", replace: true });
  }

  if (adminQ.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (adminQ.data && !adminQ.data.isAdmin) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-2xl font-bold">Not authorized</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This account doesn't have admin access.
        </p>
        <button onClick={signOut} className="mt-6 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Sign out
        </button>
      </div>
    );
  }

  const entries = listQ.data?.entries ?? [];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-5 py-10">
        <header className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
              <Shield className="h-4 w-4 text-primary-glow" />
            </span>
            <span className="font-display text-lg font-bold">Aegis · Admin</span>
          </Link>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </header>

        <div className="mt-8 flex items-end justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold">Waitlist</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {listQ.isLoading ? "Loading…" : `${entries.length} ${entries.length === 1 ? "signup" : "signups"} total`}
            </p>
          </div>
        </div>

        <div className="glass mt-6 overflow-hidden rounded-2xl">
          {listQ.isLoading ? (
            <div className="flex items-center justify-center p-10 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : entries.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              No signups yet. Share your landing page to start collecting emails.
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {entries.map((e: any) => (
                <li key={e.id} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/25">
                    <Mail className="h-4 w-4 text-primary-glow" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{e.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(e.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${e.email} from the waitlist?`)) del.mutate(e.id);
                    }}
                    disabled={del.isPending}
                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                    aria-label="Remove entry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}