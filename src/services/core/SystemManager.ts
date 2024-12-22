import { MorphyCore } from './MorphyCore';
import { QuantumSystem } from '../quantum/QuantumSystem';
import { EarthCore } from '../earth/EarthCore';
import { SeraphimCore } from '../seraphim/SeraphimCore';
import { AkashicCore } from '../akashic/AkashicCore';
import type { SystemConfig, SystemMetrics } from '../../types/core';

export class SystemManager {
  private static instance: SystemManager;
  private config: SystemConfig;
  private morphyCore: MorphyCore;
  private quantumSystem: QuantumSystem;
  private earthCore: EarthCore;
  private seraphimCore: SeraphimCore;
  private akashicCore: AkashicCore;

  private constructor(config: SystemConfig) {
    this.config = config;
    this.morphyCore = MorphyCore.getInstance();
    this.earthCore = EarthCore.getInstance();
    this.seraphimCore = SeraphimCore.getInstance();
    this.akashicCore = AkashicCore.getInstance();
    
    this.quantumSystem = new QuantumSystem(
      config.maxNodes,
      {
        energyLevel: 100,
        regenerationRate: 1,
        adaptabilityIndex: 100,
        quantumBioCoupling: 1
      },
      {
        coherenceLevel: 1,
        awarenessDepth: 1,
        quantumMemory: [],
        processingNodes: config.maxNodes
      }
    );
  }

  static getInstance(config?: SystemConfig): SystemManager {
    if (!SystemManager.instance) {
      SystemManager.instance = new SystemManager(config || {
        maxNodes: 32,
        coherenceThreshold: 0.8,
        adaptationRate: 0.1,
        intentionValidation: true
      });
    }
    return SystemManager.instance;
  }

  async initialize(): Promise<void> {
    await this.quantumSystem.initialize();
    await this.akashicCore.initialize();
    await this.earthCore.establishGrounding({
      latitude: 0,
      longitude: 0,
      altitude: 0
    });
  }

  async getSystemMetrics(): Promise<SystemMetrics> {
    const quantum = await this.quantumSystem.processQuantumState([
      { real: 1, imaginary: 0 }
    ]);

    const earth = await this.earthCore.establishGrounding({
      latitude: 0,
      longitude: 0,
      altitude: 0
    });

    return {
      performance: quantum.coherence,
      stability: earth.metrics.groundingStrength,
      coherence: quantum.coherence,
      energyEfficiency: earth.metrics.crystalResonance
    };
  }
}