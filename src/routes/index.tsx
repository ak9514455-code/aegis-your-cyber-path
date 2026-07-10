import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { SocialProof } from "@/components/landing/SocialProof";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { FloatingCTA } from "@/components/landing/FloatingCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-primary/[0.06] to-transparent" aria-hidden />

      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Problem />
          <HowItWorks />
          <Features />
          <SocialProof />
          <FinalCTA />
        </main>
        <Footer />
        <FloatingCTA />
      </div>

      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.02 265)",
            border: "1px solid oklch(0.65 0.19 255 / 0.3)",
            color: "oklch(0.98 0.005 250)",
          },
        }}
      />
    </div>
  );
}
