import { RecommendationResult } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { SpecTable } from './SpecTable';
import { WhyThisProduct } from './WhyThisProduct';

interface ProductCardProps {
  result: RecommendationResult;
  index: number;
}

function ProductImage({ formFactor, tier }: { formFactor: string; tier: string }) {
  const isRack = formFactor.includes('Rack');
  const isMobile = tier === 'mobile_vehicle';

  return (
    <div
      className="w-full h-24 rounded-lg flex items-center justify-center overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-surface-3) 100%)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      <svg
        viewBox="0 0 160 80"
        className="relative w-40 h-20 opacity-60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isRack ? (
          // Rack unit silhouette
          <>
            <rect x="10" y="20" width="140" height="18" rx="2" fill="var(--color-accent)" opacity="0.4" />
            <rect x="10" y="42" width="140" height="18" rx="2" fill="var(--color-accent)" opacity="0.25" />
            <rect x="15" y="24" width="8" height="10" rx="1" fill="var(--color-accent)" opacity="0.8" />
            <rect x="27" y="24" width="8" height="10" rx="1" fill="var(--color-accent)" opacity="0.8" />
            <rect x="15" y="46" width="8" height="10" rx="1" fill="var(--color-accent)" opacity="0.5" />
            <circle cx="135" cy="29" r="3" fill="var(--color-accent)" opacity="0.9" />
            <circle cx="125" cy="29" r="3" fill="var(--color-text-muted)" opacity="0.5" />
            <circle cx="135" cy="51" r="3" fill="var(--color-text-muted)" opacity="0.5" />
          </>
        ) : isMobile ? (
          // Compact outdoor unit
          <>
            <rect x="40" y="22" width="80" height="36" rx="4" fill="var(--color-accent)" opacity="0.35" />
            <rect x="44" y="26" width="72" height="28" rx="2" fill="var(--color-accent)" opacity="0.2" />
            {/* Antenna */}
            <line x1="60" y1="22" x2="60" y2="10" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <line x1="100" y1="22" x2="100" y2="10" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            {/* Signal arcs */}
            <path d="M72 42 Q80 34 88 42" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" opacity="0.9" strokeLinecap="round" />
            <path d="M66 47 Q80 36 94 47" stroke="var(--color-accent)" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
            <circle cx="80" cy="50" r="2" fill="var(--color-accent)" opacity="0.9" />
            {/* Ports */}
            <rect cx="55" y="46" width="6" height="4" rx="1" fill="var(--color-accent)" opacity="0.7" x="53" />
            <rect cx="65" y="46" width="6" height="4" rx="1" fill="var(--color-accent)" opacity="0.7" x="63" />
          </>
        ) : (
          // Desktop router
          <>
            <rect x="25" y="28" width="110" height="28" rx="4" fill="var(--color-accent)" opacity="0.35" />
            <rect x="29" y="32" width="102" height="20" rx="2" fill="var(--color-accent)" opacity="0.15" />
            {/* LED dots */}
            <circle cx="38" cy="42" r="2.5" fill="var(--color-accent)" opacity="1" />
            <circle cx="47" cy="42" r="2.5" fill="var(--color-accent)" opacity="0.7" />
            <circle cx="56" cy="42" r="2.5" fill="var(--color-text-muted)" opacity="0.5" />
            {/* Ports right side */}
            <rect x="98" y="36" width="8" height="12" rx="1" fill="var(--color-accent)" opacity="0.5" />
            <rect x="110" y="36" width="8" height="12" rx="1" fill="var(--color-accent)" opacity="0.5" />
            <rect x="122" y="36" width="8" height="12" rx="1" fill="var(--color-accent)" opacity="0.5" />
            {/* Form factor label */}
          </>
        )}
      </svg>
      <span
        className="absolute bottom-1.5 right-2.5 text-xs"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', fontSize: '10px' }}
      >
        {formFactor}
      </span>
    </div>
  );
}

const fitBadgeStyle: Record<string, { bg: string; color: string; border: string }> = {
  'Best Match':      { bg: 'var(--color-accent)',       color: '#fff',                    border: 'var(--color-accent)' },
  'Strong Match':    { bg: 'rgba(22,163,74,0.15)',      color: '#22c55e',                 border: 'rgba(22,163,74,0.4)' },
  'Good Alternative':{ bg: 'rgba(37,99,235,0.15)',      color: '#60a5fa',                 border: 'rgba(37,99,235,0.4)' },
  'Also Consider':   { bg: 'var(--color-surface-3)',    color: 'var(--color-text-dim)',    border: 'var(--color-border-hi)' },
};

export function ProductCard({ result, index }: ProductCardProps) {
  const { product, whyThisProduct, isPrimary, fitLabel } = result;
  const badgeStyle = fitBadgeStyle[fitLabel] ?? fitBadgeStyle['Also Consider'];

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

      {/* Product image */}
      <ProductImage formFactor={product.specs.formFactor} tier={product.tier} />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge tier={product.tier} />
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold"
              style={{
                fontFamily: 'var(--font-mono)',
                background: badgeStyle.bg,
                color: badgeStyle.color,
                border: `1px solid ${badgeStyle.border}`,
                letterSpacing: '0.08em',
              }}>
              {fitLabel === 'Best Match' ? '★ ' : ''}{fitLabel.toUpperCase()}
            </span>
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
