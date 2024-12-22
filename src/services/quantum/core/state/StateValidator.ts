import { QuantumState } from '../../../../types/quantum';

export class StateValidator {
  validateState(state: QuantumState): boolean {
    return (
      this.validateSuperposition(state.superposition) &&
      this.validateWaveFunction(state.waveFunction) &&
      this.validateCoherence(state.coherence)
    );
  }

  private validateSuperposition(superposition: number[]): boolean {
    return (
      Array.isArray(superposition) &&
      superposition.length > 0 &&
      superposition.every(value => typeof value === 'number' && !isNaN(value))
    );
  }

  private validateWaveFunction(waveFunction: any[]): boolean {
    return (
      Array.isArray(waveFunction) &&
      waveFunction.length > 0 &&
      waveFunction.every(component => 
        typeof component.real === 'number' && 
        typeof component.imaginary === 'number'
      )
    );
  }

  private validateCoherence(coherence: number): boolean {
    return (
      typeof coherence === 'number' &&
      !isNaN(coherence) &&
      coherence >= 0 &&
      coherence <= 1
    );
  }
}