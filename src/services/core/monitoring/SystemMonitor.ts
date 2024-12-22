import { EventEmitter } from 'events';
import { DebugCore } from '../../debug/DebugCore';

export class SystemMonitor {
  private static instance: SystemMonitor;
  private debug: DebugCore;
  private emitter: EventEmitter;
  private metrics: Map<string, number> = new Map();

  private constructor() {
    this.debug = DebugCore.getInstance();
    this.emitter = new EventEmitter();
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
      this.collectMetrics();
    }, 5000);
  }

  private collectMetrics(): void {
    // Collect system metrics
    const metrics = {
      memory: performance.memory?.usedJSHeapSize || 0,
      cpu: navigator.hardwareConcurrency || 1,
      timestamp: Date.now()
    };

    this.metrics.set('memory', metrics.memory);
    this.metrics.set('cpu', metrics.cpu);
    this.emitter.emit('metrics', metrics);
  }

  getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }
}