import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(255),
});

function serverClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

const ADMIN_EMAIL = "ak9514455@gmail.com";
const FROM_EMAIL = "Aegis <onboarding@resend.dev>";

async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
  reply_to?: string;
}) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!lovableKey || !resendKey) {
    console.warn("[waitlist] Skipping email — missing LOVABLE_API_KEY or RESEND_API_KEY");
    return;
  }
  try {
    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({ from: FROM_EMAIL, ...payload }),
    });
    if (!res.ok) {
      console.error("[waitlist] Email send failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("[waitlist] Email send error", err);
  }
}

function welcomeHtml(email: string) {
  return `<!doctype html><html><body style="margin:0;background:#0a0a0f;font-family:Inter,Arial,sans-serif;color:#e5e7eb;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
      <div style="width:32px;height:32px;background:#1e3a8a;border-radius:8px;display:inline-block;text-align:center;line-height:32px;color:#93c5fd;font-weight:700;">A</div>
      <span style="font-size:18px;font-weight:700;color:#fff;">Aegis</span>
    </div>
    <h1 style="font-size:22px;color:#fff;margin:0 0 12px;">Thanks for joining the waitlist</h1>
    <p style="line-height:1.6;color:#cbd5e1;margin:0 0 16px;">Hey — really glad you signed up.</p>
    <p style="line-height:1.6;color:#cbd5e1;margin:0 0 16px;">Aegis is a small project I'm building to help people learn cybersecurity without the overwhelm — 10 minutes a day, a path that actually makes sense, and something you can ask when you're stuck.</p>
    <p style="line-height:1.6;color:#cbd5e1;margin:0 0 16px;">I'll email you the moment early access is ready. No spam, no nonsense — probably one or two updates before launch.</p>
    <p style="line-height:1.6;color:#cbd5e1;margin:0 0 24px;">If you have a question or a specific thing you want Aegis to help you with, just hit reply. I read every message.</p>
    <p style="line-height:1.6;color:#94a3b8;margin:0;font-size:14px;">— Aegis team</p>
    <hr style="border:none;border-top:1px solid #1f2937;margin:32px 0 16px;" />
    <p style="font-size:12px;color:#64748b;margin:0;">You're on the list as <b>${email}</b>.</p>
  </div></body></html>`;
}

function adminNotifyHtml(email: string, total: number) {
  return `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;color:#111;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <h2 style="margin:0 0 8px;">New Aegis waitlist signup 🎉</h2>
    <p style="margin:0 0 16px;color:#374151;">One person just joined.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111;"><b>${email}</b></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Time</td><td style="padding:8px 0;color:#111;">${new Date().toUTCString()}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;">Total on waitlist</td><td style="padding:8px 0;color:#111;"><b>${total}</b></td></tr>
    </table>
  </div></body></html>`;
}

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = serverClient();
    const { error } = await supabase.from("waitlist").insert({ email: data.email });
    if (error) {
      if (error.code === "23505") return { ok: true as const, alreadyJoined: true };
      throw new Error(error.message);
    }

    // Fire-and-forget emails (don't block the response on delivery)
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true });
    const total = count ?? 0;

    await Promise.all([
      sendEmail({
        to: data.email,
        subject: "You're on the Aegis waitlist 🛡️",
        html: welcomeHtml(data.email),
      }),
      sendEmail({
        to: ADMIN_EMAIL,
        subject: `New signup: ${data.email} (${total} total)`,
        html: adminNotifyHtml(data.email, total),
        reply_to: data.email,
      }),
    ]);

    return { ok: true as const, alreadyJoined: false };
  });

export const getWaitlistCount = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverClient();
  const { data, error } = await supabase.rpc("waitlist_count");
  if (error) return { count: 0 };
  return { count: typeof data === "number" ? data : 0 };
});
