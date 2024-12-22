import { QuantumState } from '../../../../types/quantum';
import { StateProcessor } from './StateProcessor';
import { StateValidator } from './StateValidator';

export class StateManager {
  private processor: StateProcessor;
  private validator: StateValidator;
  private states: Map<string, QuantumState> = new Map();

  constructor() {
    this.processor = new StateProcessor();
    this.validator = new StateValidator();
  }

  async createState(id: string, dimensions: number): Promise<QuantumState> {
    const state = this.initializeState(dimensions);
    if (!this.validator.validateState(state)) {
      throw new Error('Invalid quantum state');
    }
    
    const processedState = await this.processor.processState(state);
    this.states.set(id, processedState);
    return processedState;
  }

  private initializeState(dimensions: number): QuantumState {
    return {
      superposition: Array.from({ length: dimensions }, () => Math.random()),
      entanglement: new Map(),
      coherence: 1.0,
      waveFunction: Array.from({ length: dimensions }, () => ({
        real: Math.random(),
        imaginary: 0
      }))
    };
  }

  getState(id: string): QuantumState | undefined {
    return this.states.get(id);
  }

  updateState(id: string, newState: Partial<QuantumState>): void {
    const currentState = this.states.get(id);
    if (!currentState) return;

    this.states.set(id, {
      ...currentState,
      ...newState
    });
  }
}