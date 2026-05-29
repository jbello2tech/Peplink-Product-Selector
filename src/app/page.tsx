import Image from "next/image";
import { WizardShell } from "@/components/wizard/WizardShell";

export default function Home() {
  return (
    <main className="relative flex-1 flex flex-col px-6">
      {/* KJJ nav header */}
      <header className="flex items-center justify-between max-w-5xl w-full mx-auto py-5 border-b" style={{ borderColor: "var(--color-border)" }}>
        <a href="https://kjjtech.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
          <Image src="/kjj-logo.jpg" alt="KJJ Tech" width={160} height={160} className="rounded-sm" />
          <span className="kjj-eyebrow" style={{ letterSpacing: "0.18em" }}>KJJ Tech</span>
        </a>
        <span className="kjj-eyebrow hidden sm:inline">Peplink Product Selector</span>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full py-16 sm:py-24 animate-fade-in">
        <span className="kjj-eyebrow mb-5">Network Hardware Advisor</span>

        <h1 className="kjj-heading text-4xl sm:text-6xl mb-6">
          Your network,<br />built to last.
        </h1>

        <p className="text-base sm:text-lg max-w-xl mx-auto mb-10" style={{ color: "var(--color-text-dim)", fontWeight: 300 }}>
          Answer 7 quick questions about your deployment and we&apos;ll recommend the right Peplink router for you.
        </p>

        {/* Wizard card */}
        <div className="w-full max-w-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <WizardShell />
        </div>
      </section>
    </main>
  );
}
