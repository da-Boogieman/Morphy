import { GroundingManager } from './core/GroundingManager';
import { EnergyManager } from './core/EnergyManager';
import { ResonanceManager } from './core/ResonanceManager';
import type { GroundingNode } from '../../types/earth';

export class EarthCore {
  private static instance: EarthCore;
  private groundingManager: GroundingManager;
  private energyManager: EnergyManager;
  private resonanceManager: ResonanceManager;

  private constructor() {
    this.groundingManager = new GroundingManager();
    this.energyManager = new EnergyManager();
    this.resonanceManager = new ResonanceManager();
  }

  static getInstance(): EarthCore {
    if (!EarthCore.instance) {
      EarthCore.instance = new EarthCore();
    }
    return EarthCore.instance;
  }

  async establishGrounding(location: {
    latitude: number;
    longitude: number;
    altitude: number;
  }): Promise<GroundingNode> {
    const node = await this.groundingManager.createNode(location);
    const connection = await this.groundingManager.connect(node);
    node.connection = connection;
    return node;
  }

  async validateGrounding(node: GroundingNode): Promise<boolean> {
    const resonance = await this.resonanceManager.measureResonance(node.location);
    const strength = node.metrics.groundingStrength * resonance.stability;
    return strength >= 0.85;
  }

  async reestablishGrounding(node: GroundingNode): Promise<void> {
    const resonance = await this.resonanceManager.measureResonance(node.location);
    node.metrics.groundingStrength *= resonance.stability;
  }

  async harvestEnergy(location: {
    latitude: number;
    longitude: number;
    altitude: number;
  }): Promise<any> {
    return this.energyManager.harvestEnergy(location);
  }
}