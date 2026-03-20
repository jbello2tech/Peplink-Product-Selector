'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardContext } from '@/context/WizardContext';
import { ResultsContainer } from '@/components/results/ResultsContainer';

export default function ResultsPage() {
  const router = useRouter();
  const { state } = useWizardContext();

  // Guard: if no recommendations, redirect back to wizard
  useEffect(() => {
    if (!state.isComplete && state.recommendations.length === 0) {
      router.replace('/');
    }
  }, [state.isComplete, state.recommendations.length, router]);

  if (!state.isComplete) return null;

  return (
    <main className="flex-1 px-4 py-12">
      <ResultsContainer />
    </main>
  );
}
