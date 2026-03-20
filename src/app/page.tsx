import { WizardShell } from "@/components/wizard/WizardShell";

export default function Home() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-12 dot-grid noise overflow-hidden">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: 'var(--color-accent)' }} />

      {/* Hero */}
      <div className="relative text-center mb-10 max-w-lg animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border text-xs font-mono tracking-widest uppercase"
          style={{
            borderColor: 'var(--color-border-hi)',
            color: 'var(--color-accent)',
            background: 'var(--color-accent-dim)',
          }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--color-accent)' }} />
          Network Hardware Advisor
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}>
          Find Your<br />
          <span style={{ color: 'var(--color-accent)' }}>Peplink Router</span>
        </h1>

        <p className="text-sm leading-relaxed max-w-sm mx-auto"
          style={{ color: 'var(--color-text-dim)' }}>
          Answer 7 quick questions about your deployment and get a precise hardware recommendation.
        </p>
      </div>

      {/* Wizard card */}
      <div className="relative w-full max-w-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <WizardShell />
      </div>

      {/* Footer */}
      <p className="relative mt-8 text-xs text-center max-w-sm"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        Prices are approximate MSRP. Contact your Peplink partner for current pricing.
      </p>
    </main>
  );
}
