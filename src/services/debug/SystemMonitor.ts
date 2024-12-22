import { DebugCore } from './DebugCore';
import { SystemMetrics } from '../../types/core';

export class SystemMonitor {
  private static instance: SystemMonitor;
  private debugCore: DebugCore;
  private metrics: SystemMetrics = {
    performance: 1,
    stability: 1,
    coherence: 1,
    energyEfficiency: 1
  };

  private thresholds = {
    performance: 0.7,
    stability: 0.8,
    coherence: 0.85,
    energyEfficiency: 0.75
  };

  private constructor() {
    this.debugCore = DebugCore.getInstance();
    this.startMonitoring();
  }

  static getInstance(): SystemMonitor {
    if (!SystemMonitor.instance) {
      SystemMonitor.instance = new SystemMonitor();
    }
    return SystemMonitor.instance;
  }

  private startMonitoring(): void {
    setInterval(() => {
      this.checkMetrics();
    }, 5000);
  }

  private checkMetrics(): void {
    Object.entries(this.metrics).forEach(([key, value]) => {
      const threshold = this.thresholds[key as keyof typeof this.thresholds];
      
      if (value < threshold) {
        this.debugCore.log('warn', `${key} below threshold: ${value}`, {
          threshold,
          current: value
        });
        this.initiateRecovery(key as keyof SystemMetrics);
      }
    });
  }

  private initiateRecovery(metric: keyof SystemMetrics): void {
    switch (metric) {
      case 'performance':
        this.optimizePerformance();
        break;
      case 'stability':
        this.stabilizeSystem();
        break;
      case 'coherence':
        this.improveCoherence();
        break;
      case 'energyEfficiency':
        this.optimizeEnergy();
        break;
    }
  }

  private optimizePerformance(): void {
    // Implement performance optimization
    this.metrics.performance *= 1.1;
  }

  private stabilizeSystem(): void {
    // Implement system stabilization
    this.metrics.stability *= 1.15;
  }

  private improveCoherence(): void {
    // Implement coherence improvement
    this.metrics.coherence *= 1.2;
  }

  private optimizeEnergy(): void {
    // Implement energy optimization
    this.metrics.energyEfficiency *= 1.1;
  }

  updateMetrics(newMetrics: Partial<SystemMetrics>): void {
    this.metrics = {
      ...this.metrics,
      ...newMetrics
    };
  }

  getMetrics(): SystemMetrics {
    return { ...this.metrics };
  }
}