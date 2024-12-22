export interface EnergyMetrics {
  natural: number;
  cosmic: number;
  crystalline: number;
  intentionPurity: number;
}

export interface SeraphimToken {
  id: string;
  amount: number;
  energySource: EnergyMetrics;
  intentionSignature: string;
  timestamp: number;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  description: string;
  monthlyContribution: number;
  benefits: {
    energyAllocation: EnergyMetrics;
    crystalStorage: number;
    intentionAmplification: number;
  };
}

export interface EnergyTransaction {
  id: string;
  type: 'harvest' | 'store' | 'transfer';
  amount: number;
  source: EnergyMetrics;
  crystalSignature?: string;
  timestamp: number;
}