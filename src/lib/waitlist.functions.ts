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

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    const supabase = serverClient();
    const { error } = await supabase.from("waitlist").insert({ email: data.email });
    if (error) {
      if (error.code === "23505") return { ok: true as const, alreadyJoined: true };
      throw new Error(error.message);
    }
    return { ok: true as const, alreadyJoined: false };
  });

export const getWaitlistCount = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverClient();
  const { data, error } = await supabase.rpc("waitlist_count");
  if (error) return { count: 0 };
  return { count: typeof data === "number" ? data : 0 };
});
