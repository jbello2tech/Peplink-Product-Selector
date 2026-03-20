import { WizardShell } from "@/components/wizard/WizardShell";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-8 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Find the Right Peplink Router
        </h1>
        <p className="text-gray-500 text-base leading-relaxed">
          Answer a few questions about your deployment and we&apos;ll recommend
          the best Peplink hardware for your needs.
        </p>
      </div>

      {/* Wizard */}
      <WizardShell />

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-400 text-center max-w-sm">
        Prices shown are approximate MSRP. Contact your Peplink partner for
        current pricing and availability.
      </p>
    </main>
  );
}
