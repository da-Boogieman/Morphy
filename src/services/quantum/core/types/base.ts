export interface Complex {
  real: number;
  imaginary: number;
}

export interface QuantumOperation {
  type: 'gate' | 'measurement' | 'initialization';
  target: number[];
  params?: Record<string, any>;
}

export interface QuantumResult {
  state: Complex[];
  probability: number;
  measurements: boolean[];
}