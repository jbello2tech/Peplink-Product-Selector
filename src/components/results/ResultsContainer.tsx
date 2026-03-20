'use client';

import { useRouter } from 'next/navigation';
import { useWizardContext } from '@/context/WizardContext';
import { ProductCard } from './ProductCard';

export function ResultsContainer() {
  const router = useRouter();
  const { state, reset } = useWizardContext();
  const { recommendations } = state;

  function handleStartOver() {
    reset();
    router.push('/');
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">No recommendations found. Try adjusting your requirements.</p>
        <button
          onClick={handleStartOver}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Recommended Products</h1>
        <p className="text-gray-500 text-sm">
          Based on your answers, here are the best Peplink options for your deployment.
        </p>
      </div>

      <div className={`grid gap-6 ${recommendations.length > 1 ? 'md:grid-cols-2' : 'max-w-lg mx-auto'} ${recommendations.length === 3 ? 'lg:grid-cols-3' : ''}`}>
        {recommendations.map((r) => (
          <ProductCard key={r.product.id} result={r} />
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleStartOver}
          className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold
            hover:border-gray-500 hover:bg-gray-50 transition-all text-sm"
        >
          ← Start Over
        </button>
      </div>
    </div>
  );
}
