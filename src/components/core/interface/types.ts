export interface SystemState {
  performance: number;
  stability: number;
  coherence: number;
  energyEfficiency: number;
}

export interface MetricData {
  label: string;
  value: number;
  threshold?: number;
}

export interface ActionConfig {
  label: string;
  handler: () => void;
  disabled?: boolean;
}