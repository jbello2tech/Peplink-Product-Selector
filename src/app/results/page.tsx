'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWizardContext } from '@/context/WizardContext';
import { ResultsContainer } from '@/components/results/ResultsContainer';
import { RecommendationResult, WizardAnswers } from '@/lib/types';
import { computeRecommendations } from '@/lib/recommend';

function ResultsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state } = useWizardContext();
  const [sharedResults, setSharedResults] = useState<RecommendationResult[] | null>(null);
  const [shareDecoded, setShareDecoded] = useState(false);

  useEffect(() => {
    const s = searchParams.get('s');
    if (s) {
      try {
        const answers = JSON.parse(decodeURIComponent(s)) as WizardAnswers;
        const results = computeRecommendations(answers);
        setSharedResults(results);
      } catch {
        // invalid share param — fall through to wizard state check
      }
      setShareDecoded(true);
    } else {
      setShareDecoded(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!shareDecoded) return;
    if (sharedResults) return; // shared link — show directly
    if (!state.isComplete && state.recommendations.length === 0) {
      router.replace('/');
    }
  }, [shareDecoded, sharedResults, state.isComplete, state.recommendations.length, router]);

  if (!shareDecoded) return null;
  if (sharedResults === null && !state.isComplete) return null;

  return (
    <main className="flex-1 dot-grid noise px-4 py-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full opacity-[0.05] blur-[120px]"
        style={{ background: 'var(--color-accent)' }} />
      <div className="relative">
        <ResultsContainer overrideRecommendations={sharedResults ?? undefined} />
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsPageInner />
    </Suspense>
  );
}
