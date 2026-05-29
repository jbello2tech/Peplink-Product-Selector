'use client';

import Image from 'next/image';
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
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-dim)', fontWeight: 300 }}>
          No matching products found for your requirements.
        </p>
        <button onClick={handleStartOver} className="kjj-btn kjj-btn--primary">
          ← Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      {/* KJJ header bar */}
      <header
        className="flex items-center justify-between py-5 mb-12 border-b"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <a
          href="https://kjjtech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          <Image src="/kjj-logo.jpg" alt="KJJ Tech" width={160} height={160} className="rounded-sm" />
          <span className="kjj-eyebrow" style={{ letterSpacing: '0.18em' }}>KJJ Tech</span>
        </a>
        <button onClick={handleStartOver} className="kjj-btn kjj-btn--ghost">
          ← Start Over
        </button>
      </header>

      {/* Title */}
      <div className="text-center mb-12 animate-fade-in">
        <span className="kjj-eyebrow block mb-4">
          {recommendations.length} Product{recommendations.length > 1 ? 's' : ''} Matched
        </span>
        <h1 className="kjj-heading text-3xl sm:text-5xl mb-4">
          Your Recommendations
        </h1>
        <p
          className="text-sm sm:text-base max-w-lg mx-auto"
          style={{ color: 'var(--color-text-dim)', fontWeight: 300 }}
        >
          Ranked by how well each product fits your requirements.
        </p>
      </div>

      {/* Cards grid */}
      <div
        className={`grid gap-6
          ${recommendations.length === 1 ? 'max-w-xl mx-auto' : ''}
          ${recommendations.length === 2 ? 'md:grid-cols-2' : ''}
          ${recommendations.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}
        `}
      >
        {recommendations.map((r, i) => (
          <ProductCard key={r.product.id} result={r} index={i} />
        ))}
      </div>

      {/* Comparison table */}
      <ComparisonTable results={recommendations} />

      {/* Footer */}
      <footer
        className="mt-16 pt-8 pb-10 border-t flex justify-center"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <a
          href="https://kjjtech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="kjj-eyebrow"
          style={{ color: 'var(--color-text)' }}
        >
          KJJ Tech · Your network, built to last →
        </a>
      </footer>
    </div>
  );
}
