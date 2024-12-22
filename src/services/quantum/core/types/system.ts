export interface SystemConfig {
  maxQubits: number;
  coherenceThreshold: number;
  processingNodes: number;
  adaptationRate: number;
}

export interface SystemMetrics {
  coherence: number;
  entanglementStrength: number;
  processingEfficiency: number;
  quantumMemoryUsage: number;
}

export interface ProcessingNode {
  id: string;
  type: 'quantum' | 'classical' | 'hybrid';
  status: 'active' | 'idle' | 'error';
  metrics: {
    load: number;
    temperature: number;
    errorRate: number;
  };
}