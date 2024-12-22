export interface RefinementMetrics {
  coherence: number;
  optimization: number;
  harmony: number;
  stability: number;
  resonance: number;
}

export interface RefinementConfig {
  target: 'system' | 'quantum' | 'harmonic';
  threshold: number;
  frequency?: number;
  iterations?: number;
}

export interface RefinementResult {
  success: boolean;
  metrics: RefinementMetrics;
  recommendations: string[];
  nextSteps: string[];
}