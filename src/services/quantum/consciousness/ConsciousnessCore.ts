import { ConsciousnessMatrix, QuantumState, Complex } from '../../../types/quantum';
import { ConsciousnessEngine } from './ConsciousnessEngine';
import { ConsciousnessProcessor } from './ConsciousnessProcessor';
import { QubitManager } from '../core/QubitManager';

export class ConsciousnessCore {
  private static instance: ConsciousnessCore;
  private engine: ConsciousnessEngine;
  private processor: ConsciousnessProcessor;
  private qubitManager: QubitManager;

  private constructor() {
    const initialMatrix: ConsciousnessMatrix = {
      coherenceLevel: 0.9,
      awarenessDepth: 0.7,
      quantumMemory: [],
      processingNodes: 4
    };

    this.engine = new ConsciousnessEngine(initialMatrix);
    this.processor = new ConsciousnessProcessor(initialMatrix);
    this.qubitManager = QubitManager.getInstance();
  }

  static getInstance(): ConsciousnessCore {
    if (!ConsciousnessCore.instance) {
      ConsciousnessCore.instance = new ConsciousnessCore();
    }
    return ConsciousnessCore.instance;
  }

  async processConsciousness(input: Complex[]): Promise<QuantumState> {
    // Create quantum representation
    const qubits = await this.createQuantumState(input);
    
    // Process through consciousness engine
    const engineState = await this.engine.processThought(qubits);
    
    // Enhance through processor
    const processedState = await this.processor.processConsciousState(engineState);
    
    return this.finalizeState(processedState);
  }

  private async createQuantumState(input: Complex[]): Promise<Complex[]> {
    const quantumState: Complex[] = [];
    
    for (const component of input) {
      const qubitId = this.qubitManager.createQubit();
      if (component.real > 0.5) {
        this.qubitManager.applyHadamard(qubitId);
      }
      
      quantumState.push({
        real: Math.random(),
        imaginary: Math.random()
      });
    }

    return quantumState;
  }

  private finalizeState(state: QuantumState): QuantumState {
    return {
      ...state,
      coherence: Math.min(1, state.coherence * 1.1),
      superposition: state.superposition.map(v => Math.abs(v))
    };
  }
}