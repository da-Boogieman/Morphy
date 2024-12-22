import { Complex, QuantumOperation, QuantumResult } from '../../types/base';
import { ComplexMath } from '../math/ComplexMath';

export class StateProcessor {
  private dimensions: number;
  private tolerance: number;

  constructor(dimensions: number, tolerance: number = 1e-10) {
    this.dimensions = dimensions;
    this.tolerance = tolerance;
  }

  processState(state: Complex[], operations: QuantumOperation[]): QuantumResult {
    let currentState = [...state];
    const measurements: boolean[] = [];

    for (const operation of operations) {
      switch (operation.type) {
        case 'gate':
          currentState = this.applyGate(currentState, operation);
          break;
        case 'measurement':
          const measurement = this.measure(currentState, operation.target);
          measurements.push(measurement);
          currentState = this.collapseState(currentState, operation.target, measurement);
          break;
      }
    }

    return {
      state: currentState,
      probability: this.calculateProbability(currentState),
      measurements
    };
  }

  private applyGate(state: Complex[], operation: QuantumOperation): Complex[] {
    return state.map(component => ({
      real: component.real * Math.cos(operation.params?.angle || 0),
      imaginary: component.imaginary * Math.sin(operation.params?.angle || 0)
    }));
  }

  private measure(state: Complex[], target: number[]): boolean {
    const probability = this.calculateProbability(state);
    return Math.random() < probability;
  }

  private collapseState(state: Complex[], target: number[], measurement: boolean): Complex[] {
    return state.map((component, index) => {
      if (target.includes(index)) {
        return {
          real: measurement ? 1 : 0,
          imaginary: 0
        };
      }
      return component;
    });
  }

  private calculateProbability(state: Complex[]): number {
    return state.reduce((sum, component) => 
      sum + ComplexMath.magnitude(component) ** 2, 0
    );
  }
}