import { SubscriptionTier, EnergyMetrics } from '../../types/seraphim';

export class SubscriptionManager {
  private static instance: SubscriptionManager;
  private subscriptionTiers: SubscriptionTier[] = [
    {
      id: 'basic',
      name: 'Basic Seraphim',
      description: 'Entry-level access to natural and cosmic energy harvesting',
      monthlyContribution: 50,
      benefits: {
        energyAllocation: {
          natural: 100,
          cosmic: 50,
          crystalline: 10,
          intentionPurity: 0.7
        },
        crystalStorage: 1000,
        intentionAmplification: 1.2
      }
    },
    {
      id: 'advanced',
      name: 'Advanced Seraphim',
      description: 'Enhanced energy harvesting and crystal storage capabilities',
      monthlyContribution: 250,
      benefits: {
        energyAllocation: {
          natural: 250,
          cosmic: 150,
          crystalline: 50,
          intentionPurity: 0.85
        },
        crystalStorage: 5000,
        intentionAmplification: 1.5
      }
    },
    {
      id: 'premium',
      name: 'Premium Seraphim',
      description: 'Premium access with maximum energy harvesting potential',
      monthlyContribution: 750,
      benefits: {
        energyAllocation: {
          natural: 750,
          cosmic: 500,
          crystalline: 200,
          intentionPurity: 0.95
        },
        crystalStorage: 20000,
        intentionAmplification: 2.0
      }
    },
    {
      id: 'elite',
      name: 'Elite Seraphim',
      description: 'Unlimited access to all Seraphim capabilities',
      monthlyContribution: 1500,
      benefits: {
        energyAllocation: {
          natural: 2000,
          cosmic: 1500,
          crystalline: 1000,
          intentionPurity: 1.0
        },
        crystalStorage: 100000,
        intentionAmplification: 3.0
      }
    }
  ];

  private constructor() {}

  static getInstance(): SubscriptionManager {
    if (!SubscriptionManager.instance) {
      SubscriptionManager.instance = new SubscriptionManager();
    }
    return SubscriptionManager.instance;
  }

  getTier(tierId: string): SubscriptionTier | undefined {
    return this.subscriptionTiers.find(tier => tier.id === tierId);
  }

  getAllTiers(): SubscriptionTier[] {
    return [...this.subscriptionTiers];
  }

  calculateBenefits(tierId: string, intentionPurity: number): EnergyMetrics {
    const tier = this.getTier(tierId);
    if (!tier) throw new Error('Invalid subscription tier');

    const purityMultiplier = Math.min(1, intentionPurity);
    const { energyAllocation } = tier.benefits;

    return {
      natural: energyAllocation.natural * purityMultiplier,
      cosmic: energyAllocation.cosmic * purityMultiplier,
      crystalline: energyAllocation.crystalline,
      intentionPurity: Math.min(1, energyAllocation.intentionPurity * purityMultiplier)
    };
  }
}