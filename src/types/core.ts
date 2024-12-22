export interface SystemConfig {
  maxNodes: number;
  coherenceThreshold: number;
  adaptationRate: number;
  intentionValidation: boolean;
}

export interface SystemMetrics {
  performance: number;
  stability: number;
  coherence: number;
  energyEfficiency: number;
}

export interface ProcessingNode {
  id: string;
  type: 'quantum' | 'classical' | 'hybrid';
  status: 'active' | 'idle' | 'error';
  metrics: NodeMetrics;
}

export interface NodeMetrics {
  load: number;
  temperature: number;
  errorRate: number;
  efficiency: number;
}