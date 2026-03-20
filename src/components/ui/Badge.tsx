import { ProductTier } from '@/lib/types';

const tierConfig: Record<ProductTier, { label: string; className: string }> = {
  mobile_vehicle: { label: 'Mobile / Vehicle', className: 'bg-orange-100 text-orange-700' },
  home_soho: { label: 'Home / SOHO', className: 'bg-green-100 text-green-700' },
  medium_business: { label: 'Medium Business', className: 'bg-blue-100 text-blue-700' },
  enterprise: { label: 'Enterprise', className: 'bg-purple-100 text-purple-700' },
};

interface BadgeProps {
  tier: ProductTier;
}

export function Badge({ tier }: BadgeProps) {
  const { label, className } = tierConfig[tier];
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
