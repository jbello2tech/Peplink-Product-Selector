export type DeploymentType = 'mobile_vehicle' | 'home_soho' | 'medium_business' | 'enterprise';
export type NumWANs = '1' | '2' | '3plus';
export type WANType = 'cellular_lte' | '5g' | 'dsl_cable' | 'fiber' | 'satellite';
export type CellularGen = 'lte_only' | '5g_needed';
export type UserCount = 'under10' | '10to50' | '50to200' | '200plus';
export type SpeedFusion = 'yes' | 'no' | 'not_sure';
export type BudgetRange = 'under500' | '500to1500' | '1500to5000' | '5000plus';
export type WiFiNeeded = 'yes' | 'no';
export type ProductTier = 'mobile_vehicle' | 'home_soho' | 'medium_business' | 'enterprise';

export interface WizardAnswers {
  deploymentType?: DeploymentType;
  numWANs?: NumWANs;
  wanTypes?: WANType[];
  cellularGen?: CellularGen;
  userCount?: UserCount;
  speedFusion?: SpeedFusion;
  budgetRange?: BudgetRange;
  wifiNeeded?: WiFiNeeded;
}

export interface ProductSpec {
  wanPorts: number;
  maxThroughput: string;
  cellular: boolean;
  cellular5G: boolean;
  wifi: boolean;
  wifiStandard?: string;
  speedFusionCapable: boolean;
  lanPorts: number;
  formFactor: string;
  maxUsers?: number;
  operatingTemp?: string;
}

export interface Product {
  id: string;
  name: string;
  tier: ProductTier;
  priceUSD: number;
  tagline: string;
  specs: ProductSpec;
  keyFeatures: string[];
  idealFor: string;
  learnMoreUrl: string;
}

export interface RecommendationResult {
  product: Product;
  matchScore: number;
  whyThisProduct: string;
  isPrimary: boolean;
}

export interface WizardState {
  currentStep: number;
  answers: WizardAnswers;
  isComplete: boolean;
  recommendations: RecommendationResult[];
}

export type WizardAction =
  | { type: 'SET_ANSWER'; field: keyof WizardAnswers; value: WizardAnswers[keyof WizardAnswers] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'COMPLETE_WIZARD'; recommendations: RecommendationResult[] }
  | { type: 'RESET' };
