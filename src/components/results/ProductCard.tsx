import { RecommendationResult } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { SpecTable } from './SpecTable';
import { WhyThisProduct } from './WhyThisProduct';

interface ProductCardProps {
  result: RecommendationResult;
  index: number;
}

export function ProductCard({ result, index }: ProductCardProps) {
  const { product, whyThisProduct, isPrimary } = result;

  return (
    <div
      className="relative flex flex-col gap-5 rounded-xl overflow-hidden scanline animate-slide-up"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: 'var(--color-surface)',
        border: isPrimary
          ? '1px solid var(--color-accent)'
          : '1px solid var(--color-border)',
        boxShadow: isPrimary ? '0 0 32px var(--color-accent-glow)' : 'none',
        padding: '24px',
      }}>

      {/* Primary top bar */}
      {isPrimary && (
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2), transparent)' }} />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge tier={product.tier} />
            {isPrimary && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--color-accent)',
                  color: '#fff',
                  letterSpacing: '0.08em',
                }}>
                ★ BEST MATCH
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text)' }}>
            {product.name}
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-dim)' }}>
            {product.tagline}
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-xs tracking-widest uppercase mb-0.5"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
            Est. MSRP
          </div>
          <div className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-mono)', color: isPrimary ? 'var(--color-accent)' : 'var(--color-text)' }}>
            ${product.priceUSD.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Why */}
      <WhyThisProduct text={whyThisProduct} />

      {/* Key Features */}
      <div>
        <div className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
          Key Features
        </div>
        <ul className="space-y-2">
          {product.keyFeatures.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm"
              style={{ color: 'var(--color-text-dim)' }}>
              <span className="flex-shrink-0 mt-0.5 font-bold"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                →
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Specs */}
      <div>
        <div className="text-xs font-bold tracking-widest uppercase mb-3"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
          Specifications
        </div>
        <SpecTable specs={product.specs} />
      </div>

      {/* Ideal For */}
      <p className="text-xs leading-relaxed"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        // {product.idealFor}
      </p>

      {/* CTA */}
      <a
        href={product.learnMoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center py-3 px-4 rounded-lg text-sm font-bold tracking-wide transition-all duration-150 relative overflow-hidden group"
        style={{
          fontFamily: 'var(--font-mono)',
          background: isPrimary ? 'var(--color-accent)' : 'var(--color-surface-2)',
          border: `1px solid ${isPrimary ? 'var(--color-accent)' : 'var(--color-border-hi)'}`,
          color: isPrimary ? '#fff' : 'var(--color-text-dim)',
          boxShadow: isPrimary ? '0 0 16px var(--color-accent-glow)' : 'none',
        }}
      >
        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-white/10 skew-x-12 pointer-events-none" />
        <span className="relative">View on Peplink.com →</span>
      </a>
    </div>
  );
}
