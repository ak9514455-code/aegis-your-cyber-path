
## Aegis Landing Page

A dark, professional cybersecurity-themed landing page with a working waitlist backend.

### Design system (src/styles.css)
- Background `#0a0a0f`, primary `#3b82f6` (electric blue), secondary `#06b6d4` (cyan), text white/gray tokens
- Fonts loaded via `<link>` in `__root.tsx`: Space Grotesk (headings), Inter (body)
- Utilities: subtle circuit-grid background (radial + linear gradients), glassmorphism card (`backdrop-blur` + blue-tinted border/glow), blue hover-glow button variant, fade-in-on-scroll animation
- All colors as semantic tokens — no hardcoded hex in components

### Backend (Lovable Cloud)
- Enable Lovable Cloud
- Migration: create `public.waitlist` table (`id uuid pk`, `email text unique not null citext-lower`, `created_at timestamptz default now()`)
- GRANTs: `INSERT` to `anon` + `authenticated`; `SELECT` to `service_role` only (emails not publicly readable)
- RLS enabled; policy: `anon` + `authenticated` can INSERT; no SELECT policy for public
- Server function `src/lib/waitlist.functions.ts` → `joinWaitlist({ email })` with Zod validation (trim, email, max 255), uses server publishable client, returns `{ ok, alreadyJoined }`
- Public server fn `getWaitlistCount()` calls an RPC `waitlist_count()` (SECURITY DEFINER) returning integer count — used for hero social-proof line

### Route & sections (src/routes/index.tsx + components under src/components/landing/)
1. `Navbar` — sticky, glass background, Shield icon + "Aegis", "Join Waitlist" CTA (scrolls to CTA)
2. `Hero` — headline, subheadline, `WaitlistForm` variant "hero", live count text, mock learning-path glass card on right (Networking / Linux / Ethical Hacking with progress dots and glow)
3. `Problem` — "Sound familiar?" 3-card grid with lucide icons (HelpCircle, Clock, Brain)
4. `HowItWorks` — 4 numbered steps with connecting gradient line (horizontal desktop, vertical mobile)
5. `Features` — 2×2 grid, icons Map/Clock/MessageCircle/BrainCircuit
6. `SocialProof` — 2 quote cards with quote-mark styling
7. `FinalCTA` — reuses `WaitlistForm` variant "cta"
8. `Footer` — logo, tagline, © 2026

### Shared behavior
- `WaitlistForm` component: Zod validation, calls `joinWaitlist` via `useServerFn`, shows toast + inline success state, disables on submit
- `FloatingCTA` — fixed bottom-right button appears after scroll > hero height (IntersectionObserver on hero sentinel), scrolls to `#waitlist`
- `useReveal` hook — IntersectionObserver adds `animate-fade-in` when sections enter viewport
- Smooth scroll via `scroll-behavior: smooth` on html + anchor IDs (`#waitlist`)
- Fully responsive (mobile: single column, stacked steps, form stacks below input)

### Head metadata (__root.tsx)
- Title: "Aegis — Learn cybersecurity 10 minutes a day"
- Description: AI cybersecurity learning companion for overwhelmed beginners
- Matching og:/twitter: tags; no og:image (hosting injects screenshot)

### Files to add/modify
- Modify: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`
- Add: `src/components/landing/{Navbar,Hero,Problem,HowItWorks,Features,SocialProof,FinalCTA,Footer,WaitlistForm,FloatingCTA,MockPathCard}.tsx`, `src/hooks/use-reveal.ts`, `src/lib/waitlist.functions.ts`
- Migration for `waitlist` table + `waitlist_count` RPC
