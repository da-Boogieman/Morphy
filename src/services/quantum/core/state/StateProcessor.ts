import { QuantumState, Complex } from '../../../../types/quantum';
import { ComplexMath } from '../math/ComplexMath';

export class StateProcessor {
  async processState(state: QuantumState): Promise<QuantumState> {
    const normalizedWaveFunction = this.normalizeWaveFunction(state.waveFunction);
    const coherence = this.calculateCoherence(normalizedWaveFunction);
    
    return {
      ...state,
      waveFunction: normalizedWaveFunction,
      coherence,
      superposition: this.calculateSuperposition(normalizedWaveFunction)
    };
  }

  private normalizeWaveFunction(waveFunction: Complex[]): Complex[] {
    const magnitude = Math.sqrt(waveFunction.reduce((sum, component) => 
      sum + ComplexMath.magnitude(component) ** 2, 0
    ));

    return waveFunction.map(component => ({
      real: component.real / magnitude,
      imaginary: component.imaginary / magnitude
    }));
  }

  private calculateCoherence(waveFunction: Complex[]): number {
    return waveFunction.reduce((sum, component) => 
      sum + ComplexMath.magnitude(component), 0
    ) / waveFunction.length;
  }

  private calculateSuperposition(waveFunction: Complex[]): number[] {
    return waveFunction.map(component => 
      ComplexMath.magnitude(component)
    );
  }
}