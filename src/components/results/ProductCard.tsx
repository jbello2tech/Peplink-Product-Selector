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
      className="w-full h-24 flex items-center justify-center overflow-hidden relative"
      style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
        borderRadius: '2px',
      }}
    >
      <svg
        viewBox="0 0 160 80"
        className="relative w-40 h-20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isRack ? (
          <>
            <rect x="10" y="20" width="140" height="18" rx="1" fill="var(--color-accent)" opacity="0.85" />
            <rect x="10" y="42" width="140" height="18" rx="1" fill="var(--color-accent)" opacity="0.55" />
            <rect x="15" y="24" width="8" height="10" rx="1" fill="#fff" opacity="0.9" />
            <rect x="27" y="24" width="8" height="10" rx="1" fill="#fff" opacity="0.9" />
            <rect x="15" y="46" width="8" height="10" rx="1" fill="#fff" opacity="0.6" />
            <circle cx="135" cy="29" r="2.5" fill="#fff" opacity="0.95" />
            <circle cx="125" cy="29" r="2.5" fill="#fff" opacity="0.5" />
            <circle cx="135" cy="51" r="2.5" fill="#fff" opacity="0.6" />
          </>
        ) : isMobile ? (
          <>
            <rect x="40" y="22" width="80" height="36" rx="2" fill="var(--color-accent)" opacity="0.8" />
            <line x1="60" y1="22" x2="60" y2="10" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
            <line x1="100" y1="22" x2="100" y2="10" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
            <path d="M72 42 Q80 34 88 42" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.95" strokeLinecap="round" />
            <path d="M66 47 Q80 36 94 47" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.65" strokeLinecap="round" />
            <circle cx="80" cy="50" r="2" fill="#fff" opacity="1" />
          </>
        ) : (
          <>
            <rect x="25" y="28" width="110" height="28" rx="2" fill="var(--color-accent)" opacity="0.85" />
            <circle cx="38" cy="42" r="2.5" fill="#fff" opacity="1" />
            <circle cx="47" cy="42" r="2.5" fill="#fff" opacity="0.7" />
            <circle cx="56" cy="42" r="2.5" fill="#fff" opacity="0.4" />
            <rect x="98" y="36" width="8" height="12" rx="1" fill="#fff" opacity="0.6" />
            <rect x="110" y="36" width="8" height="12" rx="1" fill="#fff" opacity="0.6" />
            <rect x="122" y="36" width="8" height="12" rx="1" fill="#fff" opacity="0.6" />
          </>
        )}
      </svg>
      <span
        className="absolute bottom-1.5 right-2.5 kjj-eyebrow"
        style={{ fontSize: '9px', letterSpacing: '0.2em' }}
      >
        {formFactor}
      </span>
    </div>
  );
}

const fitLabelMeta: Record<string, { symbol: string }> = {
  'Best Match': { symbol: '★' },
  'Strong Match': { symbol: '◆' },
  'Good Alternative': { symbol: '◇' },
  'Also Consider': { symbol: '·' },
};

export function ProductCard({ result, index }: ProductCardProps) {
  const { product, whyThisProduct, isPrimary, fitLabel } = result;
  const symbol = fitLabelMeta[fitLabel]?.symbol ?? '·';

  return (
    <div
      className="relative flex flex-col gap-5 overflow-hidden animate-slide-up"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: 'var(--color-surface)',
        border: isPrimary ? '1px solid var(--color-accent)' : '1px solid var(--color-border-hi)',
        borderRadius: '2px',
        padding: '28px',
      }}
    >
      {isPrimary && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: '3px', background: 'var(--color-accent)' }}
        />
      )}

      <ProductImage formFactor={product.specs.formFactor} tier={product.tier} />

      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge tier={product.tier} />
            <span
              className="kjj-eyebrow inline-flex items-center gap-1.5 px-2.5 py-1"
              style={{
                color: isPrimary ? '#fff' : 'var(--color-text)',
                background: isPrimary ? 'var(--color-accent)' : 'transparent',
                border: `1px solid ${isPrimary ? 'var(--color-accent)' : 'var(--color-border-hi)'}`,
                borderRadius: '2px',
              }}
            >
              <span>{symbol}</span>
              {fitLabel}
            </span>
          </div>
          <h3 className="kjj-heading text-2xl mb-2">
            {product.name}
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-text-dim)', fontWeight: 300 }}>
            {product.tagline}
          </p>
        </div>

        <div className="text-right flex-shrink-0 flex flex-col gap-2">
          <div>
            <div className="kjj-eyebrow mb-1">Est. MSRP</div>
            <div
              className="text-3xl"
              style={{ color: 'var(--color-text)', fontWeight: 200, letterSpacing: '0.02em' }}
            >
              ${product.priceUSD.toLocaleString()}
            </div>
          </div>
          {product.goldPriceUSD !== undefined && (
            <div
              className="pt-2 mt-1"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <div className="kjj-eyebrow mb-1" style={{ color: 'var(--color-accent)' }}>
                ★ Gold Partner
              </div>
              <div
                className="text-2xl"
                style={{ color: 'var(--color-accent)', fontWeight: 300, letterSpacing: '0.02em' }}
              >
                ${product.goldPriceUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          )}
        </div>
      </div>

      <WhyThisProduct text={whyThisProduct} />

      <div>
        <div className="kjj-eyebrow mb-3">Key Features</div>
        <ul className="space-y-2">
          {product.keyFeatures.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm"
              style={{ color: 'var(--color-text-dim)', fontWeight: 300 }}
            >
              <span
                className="flex-shrink-0 mt-1.5 w-1 h-1"
                style={{ background: 'var(--color-accent)' }}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="kjj-eyebrow mb-3">Specifications</div>
        <SpecTable specs={product.specs} />
      </div>

      <p
        className="text-xs leading-relaxed pt-2"
        style={{ color: 'var(--color-text-dim)', fontStyle: 'italic', fontWeight: 300 }}
      >
        {product.idealFor}
      </p>

      <a
        href={product.learnMoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`kjj-btn ${isPrimary ? 'kjj-btn--primary' : 'kjj-btn--ghost'}`}
      >
        View on Peplink.com →
      </a>
    </div>
  );
}
