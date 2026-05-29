import { ProductTier } from '@/lib/types';

const tierLabels: Record<ProductTier, string> = {
  mobile_vehicle:  'Mobile / Vehicle',
  home_soho:       'Home / SOHO',
  medium_business: 'Medium Business',
  enterprise:      'Enterprise',
};

interface BadgeProps {
  tier: ProductTier;
}

export function Badge({ tier }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs"
      style={{
        color: 'var(--color-text)',
        background: 'transparent',
        border: '1px solid var(--color-border-hi)',
        borderRadius: '2px',
        fontWeight: 300,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}
    >
      <span
        className="w-1 h-1 flex-shrink-0"
        style={{ background: 'var(--color-accent)' }}
      />
      {tierLabels[tier]}
    </span>
  );
}
