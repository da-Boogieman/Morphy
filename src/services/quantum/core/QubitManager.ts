import { Complex } from '../../../types/quantum';

export class QubitManager {
  private static instance: QubitManager;
  private qubits: Map<string, Complex[]> = new Map();

  private constructor() {}

  static getInstance(): QubitManager {
    if (!QubitManager.instance) {
      QubitManager.instance = new QubitManager();
    }
    return QubitManager.instance;
  }

  createQubit(): string {
    const id = crypto.randomUUID();
    this.qubits.set(id, [
      { real: 1, imaginary: 0 }, // |0⟩ state
      { real: 0, imaginary: 0 }  // |1⟩ state
    ]);
    return id;
  }

  applyHadamard(qubitId: string): void {
    const qubit = this.qubits.get(qubitId);
    if (!qubit) return;

    const factor = 1 / Math.sqrt(2);
    const [zero, one] = qubit;
    
    this.qubits.set(qubitId, [
      {
        real: (zero.real + one.real) * factor,
        imaginary: (zero.imaginary + one.imaginary) * factor
      },
      {
        real: (zero.real - one.real) * factor,
        imaginary: (zero.imaginary - one.imaginary) * factor
      }
    ]);
  }

  measure(qubitId: string): boolean {
    const qubit = this.qubits.get(qubitId);
    if (!qubit) return false;

    const [zero, one] = qubit;
    const zeroProb = zero.real * zero.real + zero.imaginary * zero.imaginary;
    const measurement = Math.random() <= zeroProb;

    // Collapse state
    this.qubits.set(qubitId, [
      { real: measurement ? 1 : 0, imaginary: 0 },
      { real: measurement ? 0 : 1, imaginary: 0 }
    ]);

    return !measurement;
  }
}