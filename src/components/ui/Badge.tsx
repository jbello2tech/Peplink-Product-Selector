import { ProductTier } from '@/lib/types';

const tierConfig: Record<ProductTier, { label: string; color: string }> = {
  mobile_vehicle:  { label: 'Mobile / Vehicle',  color: '#d97706' },
  home_soho:       { label: 'Home / SOHO',        color: '#16a34a' },
  medium_business: { label: 'Medium Business',    color: '#2563eb' },
  enterprise:      { label: 'Enterprise',         color: '#7c3aed' },
};

interface BadgeProps {
  tier: ProductTier;
}

export function Badge({ tier }: BadgeProps) {
  const { label, color } = tierConfig[tier];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold tracking-wider uppercase"
      style={{
        fontFamily: 'var(--font-mono)',
        color,
        background: `${color}22`,
        border: `1px solid ${color}44`,
      }}
    >
      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
      {label}
    </span>
  );
}
