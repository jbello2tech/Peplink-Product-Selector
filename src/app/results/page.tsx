'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardContext } from '@/context/WizardContext';
import { ResultsContainer } from '@/components/results/ResultsContainer';

export default function ResultsPage() {
  const router = useRouter();
  const { state } = useWizardContext();

  useEffect(() => {
    if (!state.isComplete && state.recommendations.length === 0) {
      router.replace('/');
    }
  }, [state.isComplete, state.recommendations.length, router]);

  if (!state.isComplete) return null;

  return (
    <main className="flex-1 dot-grid noise px-4 py-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full opacity-[0.05] blur-[120px]"
        style={{ background: 'var(--color-accent)' }} />
      <div className="relative">
        <ResultsContainer />
      </div>
    </main>
  );
}
