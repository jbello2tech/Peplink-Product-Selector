import { RecommendationResult } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { SpecTable } from './SpecTable';
import { WhyThisProduct } from './WhyThisProduct';

interface ProductCardProps {
  result: RecommendationResult;
}

export function ProductCard({ result }: ProductCardProps) {
  const { product, whyThisProduct, isPrimary } = result;

  return (
    <div className={`bg-white rounded-2xl border-2 p-6 flex flex-col gap-4
      ${isPrimary ? 'border-blue-500 shadow-md' : 'border-gray-200 shadow-sm'}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge tier={product.tier} />
            {isPrimary && (
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                Best Match
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{product.tagline}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Est. Price</div>
          <div className="text-2xl font-bold text-gray-900">
            ${product.priceUSD.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Why */}
      <WhyThisProduct text={whyThisProduct} />

      {/* Key Features */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Features</h4>
        <ul className="space-y-1">
          {product.keyFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-500 mt-0.5 flex-shrink-0">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Specs */}
      <div>
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specifications</h4>
        <SpecTable specs={product.specs} />
      </div>

      {/* Ideal For */}
      <p className="text-xs text-gray-500 italic">{product.idealFor}</p>

      {/* CTA */}
      <a
        href={product.learnMoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center py-2.5 px-4 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-sm
          hover:bg-blue-600 hover:text-white transition-all"
      >
        Learn More on Peplink.com →
      </a>
    </div>
  );
}
