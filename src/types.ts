export interface ClientWork {
  client: string;
  result: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  bulletPoints: string[];
  goal: string;
  deepInfo?: string;
  clientWorks?: ClientWork[];
}

export interface TargetPersona {
  name: string;
  demographic: string;
  painPoints: string[];
  buyingTrigger: string;
}

export interface FunnelStage {
  campaignName: string;
  targeting: string;
  concept: string;
}

export interface RetargetingStage {
  campaignName: string;
  retargeting: string;
  offer: string;
}

export interface BofStage {
  campaignName: string;
  cta: string;
  socialProof: string;
}

export interface MetaAdsStrategy {
  tof: FunnelStage;
  mof: RetargetingStage;
  bof: BofStage;
}

export interface CreativeConcept {
  type: string;
  hookMessage: string;
  primaryText: string;
  visualMockupPrompt: string;
}

export interface AIGrowthLever {
  automationGoal: string;
  stepsToImplement: string[];
}

export interface PredictedMetrics {
  estimatedCplRange: string;
  suggestedMonthlyBudget: string;
  expectedConversionRate: string;
  estimatedRoiMultiple: string;
}

export interface ClientBlueprint {
  targetPersona: TargetPersona;
  metaAdsStrategy: MetaAdsStrategy;
  creativeConcept: CreativeConcept;
  aiGrowthLever: AIGrowthLever;
  predictedMetrics: PredictedMetrics;
  customConsultantNote: string;
}

export interface ROIinputs {
  monthlyAdSpend: number;
  averageValuePerSale: number;
  expectedCpl: number;
  closeRate: number; // percentage
}

export interface ROIresults {
  leadsGenerated: number;
  salesGenerated: number;
  totalRevenue: number;
  netProfit: number;
  roiPercentage: number;
}
