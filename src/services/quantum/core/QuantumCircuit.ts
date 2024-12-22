import { Complex } from '../../../types/quantum';
import { QuantumGates } from './QuantumGates';
import { CircuitOperation } from './types/circuit';

export class QuantumCircuit {
  private operations: CircuitOperation[] = [];
  private maxQubits: number;

  constructor(maxQubits: number = 8) {
    this.maxQubits = maxQubits;
  }

  addGate(gate: keyof typeof QuantumGates, qubit: number, params?: number): void {
    if (qubit >= this.maxQubits) {
      throw new Error('Qubit index exceeds circuit size');
    }

    this.operations.push({ gate, qubit, params });
  }

  async execute(initialState: Complex[][]): Promise<Complex[][]> {
    let currentState = [...initialState];

    for (const op of this.operations) {
      currentState[op.qubit] = await this.applyGate(
        op.gate,
        currentState[op.qubit],
        op.params
      );
    }

    return currentState;
  }

  private async applyGate(
    gate: keyof typeof QuantumGates,
    state: Complex[],
    params?: number
  ): Promise<Complex[]> {
    if (params !== undefined) {
      return QuantumGates[gate](state, params);
    }
    return QuantumGates[gate](state);
  }

  reset(): void {
    this.operations = [];
  }
}