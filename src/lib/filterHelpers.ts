import { DeploymentType, Product, ProductTier, UserCount } from '@/lib/types';

export function getTierForDeployment(deploymentType: DeploymentType): ProductTier {
  return deploymentType; // they map 1:1
}

export function getTierLabel(tier: ProductTier): string {
  const labels: Record<ProductTier, string> = {
    mobile_vehicle: 'Mobile/Vehicle',
    home_soho: 'Home/Small Office',
    medium_business: 'Medium Business',
    enterprise: 'Enterprise',
  };
  return labels[tier];
}

export function getDeploymentLabel(d: DeploymentType): string {
  return getTierLabel(d);
}

export function getUserCapacityLabel(userCount: UserCount): string {
  const labels: Record<UserCount, string> = {
    under10: 'under 10 users',
    '10to50': '10–50 users',
    '50to200': '50–200 users',
    '200plus': '200+ users',
  };
  return labels[userCount];
}

export function productFitsUserCount(product: Product, userCount: UserCount): boolean {
  const maxUsers = product.specs.maxUsers;
  if (!maxUsers) return true;
  switch (userCount) {
    case 'under10': return true; // almost any device handles this
    case '10to50': return maxUsers >= 20;
    case '50to200': return maxUsers >= 50;
    case '200plus': return maxUsers >= 200;
  }
}
