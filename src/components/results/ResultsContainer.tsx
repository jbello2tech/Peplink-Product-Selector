'use client';

import { useRouter } from 'next/navigation';
import { useWizardContext } from '@/context/WizardContext';
import { RecommendationResult } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { ComparisonTable } from './ComparisonTable';

interface ResultsContainerProps {
  overrideRecommendations?: RecommendationResult[];
}

export function ResultsContainer({ overrideRecommendations }: ResultsContainerProps) {
  const router = useRouter();
  const { state, reset } = useWizardContext();

  const recommendations = overrideRecommendations ?? state.recommendations;

  function handleStartOver() {
    reset();
    router.push('/');
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-dim)' }}>
          No matching products found for your requirements.
        </p>
        <button onClick={handleStartOver} className="px-6 py-3 rounded-lg text-sm font-bold"
          style={{
            fontFamily: 'var(--font-mono)',
            background: 'var(--color-accent)',
            color: '#fff',
          }}>
          ← Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border text-xs font-mono tracking-widest uppercase"
          style={{
            borderColor: 'var(--color-border-hi)',
            color: 'var(--color-accent)',
            background: 'var(--color-accent-dim)',
          }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
          {recommendations.length} Product{recommendations.length > 1 ? 's' : ''} Matched
        </div>
        <h1 className="text-3xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}>
          Your Recommendations
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-dim)' }}>
          Ranked by how well each product fits your requirements.
        </p>
      </div>

      {/* Cards grid */}
      <div className={`grid gap-5
        ${recommendations.length === 1 ? 'max-w-lg mx-auto' : ''}
        ${recommendations.length === 2 ? 'md:grid-cols-2' : ''}
        ${recommendations.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}
      `}>
        {recommendations.map((r, i) => (
          <ProductCard key={r.product.id} result={r} index={i} />
        ))}
      </div>

      {/* Comparison table */}
      <ComparisonTable results={recommendations} />

      {/* Footer actions */}
      <div className="text-center mt-8 pb-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <p className="text-xs hidden sm:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
          // Prices are approximate MSRP. Contact your Peplink partner for current pricing.
        </p>
        <button
          onClick={handleStartOver}
          className="px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-150"
          style={{
            fontFamily: 'var(--font-mono)',
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border-hi)',
            color: 'var(--color-text-dim)',
          }}
        >
          ← Start Over
        </button>
      </div>
      <p className="text-xs text-center sm:hidden mt-2 pb-4"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
        // Prices are approximate MSRP. Contact your Peplink partner for current pricing.
      </p>
    </div>
  );
}
