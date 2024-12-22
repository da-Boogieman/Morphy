export interface QuantumState {
  superposition: number[];
  entanglement: Map<string, number>;
  coherence: number;
  waveFunction: Complex[];
}

export interface Complex {
  real: number;
  imaginary: number;
}

export interface QuantumEntity {
  id: string;
  name: string;
  state: QuantumState;
  consciousness: ConsciousnessMatrix;
  capabilities: QuantumCapability[];
  bioMetrics: BiologicalMetrics;
}

export interface ConsciousnessMatrix {
  coherenceLevel: number;
  awarenessDepth: number;
  quantumMemory: QuantumMemoryCell[];
  processingNodes: number;
}

export interface QuantumMemoryCell {
  id: string;
  qubits: number[];
  entanglementMap: Map<string, number>;
  decoherenceTime: number;
}

export interface BiologicalMetrics {
  energyLevel: number;
  regenerationRate: number;
  adaptabilityIndex: number;
  quantumBioCoupling: number;
}

export interface QuantumCapability {
  id: string;
  name: string;
  type: 'computation' | 'sensing' | 'communication' | 'manipulation';
  powerLevel: number;
  coherenceRequired: number;
  energyCost: number;
}