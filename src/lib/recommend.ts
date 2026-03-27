import { Product, RecommendationResult, WizardAnswers } from '@/lib/types';
import { PRODUCTS } from '@/data/products';
import {
  getDeploymentLabel,
  getTierForDeployment,
  getUserCapacityLabel,
  productFitsUserCount,
} from '@/lib/filterHelpers';

function applyHardFilters(products: Product[], answers: WizardAnswers): Product[] {
  return products.filter((p) => {
    // Tier must match deployment type
    if (answers.deploymentType) {
      const expectedTier = getTierForDeployment(answers.deploymentType);
      if (p.tier !== expectedTier) return false;
    }

    // 5G required → must have 5G
    if (answers.cellularGen === '5g_needed' && !p.specs.cellular5G) return false;

    return true;
  });
}

// Resolve "not_sure" SpeedFusion based on context:
// Multiple connections → recommend it; single connection → not needed
function resolveSpeedFusion(answers: WizardAnswers): 'yes' | 'no' {
  if (answers.speedFusion === 'yes') return 'yes';
  if (answers.speedFusion === 'no') return 'no';
  // not_sure: recommend if they have multiple connections
  const multiWAN = answers.numWANs === '2' || answers.numWANs === '3plus';
  return multiWAN ? 'yes' : 'no';
}

interface ScoredProduct {
  product: Product;
  score: number;
  matchedReasons: string[];
}

function scoreProduct(product: Product, answers: WizardAnswers): ScoredProduct {
  let score = 0;
  const matchedReasons: string[] = [];
  const effectiveSpeedFusion = resolveSpeedFusion(answers);

  // WAN port count (weight: 20)
  if (answers.numWANs) {
    const wanMatch =
      (answers.numWANs === '1' && product.specs.wanPorts >= 1) ||
      (answers.numWANs === '2' && product.specs.wanPorts >= 2) ||
      (answers.numWANs === '3plus' && product.specs.wanPorts >= 3);
    if (wanMatch) {
      score += 20;
      const wanLabel = answers.numWANs === '1' ? '1 connection' : answers.numWANs === '2' ? '2 connections' : '3+ connections';
      matchedReasons.push(`supports ${wanLabel}`);
    }
  }

  // User capacity (weight: 20)
  if (answers.userCount && productFitsUserCount(product, answers.userCount)) {
    score += 20;
    matchedReasons.push(`handles ${getUserCapacityLabel(answers.userCount)}`);
  }

  // Cellular WAN selected and product has cellular (weight: 15)
  const needsCellular = answers.wanTypes?.some((t) => t === 'cellular_lte' || t === '5g');
  if (needsCellular && product.specs.cellular) {
    score += 15;
    matchedReasons.push('includes a built-in cellular modem');
  }

  // 5G selected and product has 5G (weight: 15)
  if (answers.wanTypes?.includes('5g') && product.specs.cellular5G) {
    score += 15;
    matchedReasons.push('supports 5G connectivity');
  }

  // SpeedFusion needed (weight: 10)
  if (effectiveSpeedFusion === 'yes' && product.specs.speedFusionCapable) {
    score += 10;
    matchedReasons.push('is SpeedFusion-capable for connection bonding');
  }

  // Wi-Fi needed (weight: 10)
  if (answers.wifiNeeded === 'yes' && product.specs.wifi) {
    score += 10;
    matchedReasons.push('includes built-in Wi-Fi');
  }

  // Penalize if Wi-Fi needed but product has none
  if (answers.wifiNeeded === 'yes' && !product.specs.wifi) {
    score -= 5;
  }

  return { product, score, matchedReasons };
}

function buildWhyText(product: Product, reasons: string[], answers: WizardAnswers): string {
  if (reasons.length === 0) {
    return `The ${product.name} is a solid general-purpose choice for your deployment.`;
  }

  const deploymentLabel = answers.deploymentType ? getDeploymentLabel(answers.deploymentType) : null;
  const prefix = deploymentLabel
    ? `The ${product.name} is purpose-built for ${deploymentLabel} deployments and `
    : `The ${product.name} `;

  if (reasons.length === 1) {
    return `${prefix}${reasons[0]}.`;
  }

  const last = reasons[reasons.length - 1];
  const rest = reasons.slice(0, -1).join(', ');
  return `${prefix}${rest}, and ${last}.`;
}

function getFitLabel(index: number, score: number): string {
  if (index === 0) return 'Best Match';
  if (index === 1) return score >= 40 ? 'Strong Match' : 'Good Alternative';
  return 'Also Consider';
}

export function computeRecommendations(answers: WizardAnswers): RecommendationResult[] {
  const filtered = applyHardFilters(PRODUCTS, answers);

  if (filtered.length === 0) {
    const fallback = PRODUCTS.filter((p) => {
      if (answers.deploymentType && p.tier !== getTierForDeployment(answers.deploymentType)) return false;
      if (answers.cellularGen === '5g_needed' && !p.specs.cellular5G) return false;
      return true;
    });
    return scoredResults(fallback, answers);
  }

  return scoredResults(filtered, answers);
}

function scoredResults(products: Product[], answers: WizardAnswers): RecommendationResult[] {
  const scored = products
    .map((p) => scoreProduct(p, answers))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored.map((s, i) => ({
    product: s.product,
    matchScore: s.score,
    whyThisProduct: buildWhyText(s.product, s.matchedReasons, answers),
    isPrimary: i === 0,
    fitLabel: getFitLabel(i, s.score),
  }));
}
