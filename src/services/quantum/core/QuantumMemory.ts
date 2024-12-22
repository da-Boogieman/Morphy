import { QuantumMemoryCell } from '../../../types/quantum';

export class QuantumMemory {
  private cells: Map<string, QuantumMemoryCell> = new Map();
  private decoherenceRate = 0.01;

  addMemoryCell(qubits: number[]): string {
    const id = crypto.randomUUID();
    
    this.cells.set(id, {
      id,
      qubits,
      entanglementMap: new Map(),
      decoherenceTime: Date.now()
    });

    return id;
  }

  entangle(cellId: string, targetId: string, strength: number): void {
    const cell = this.cells.get(cellId);
    if (!cell) return;

    cell.entanglementMap.set(targetId, strength);
  }

  updateDecoherence(): void {
    const now = Date.now();
    
    this.cells.forEach((cell, id) => {
      const timeDiff = (now - cell.decoherenceTime) / 1000;
      const decoherence = Math.exp(-this.decoherenceRate * timeDiff);

      cell.entanglementMap.forEach((strength, targetId) => {
        cell.entanglementMap.set(targetId, strength * decoherence);
      });

      // Clean up weak entanglements
      cell.entanglementMap = new Map(
        Array.from(cell.entanglementMap.entries())
          .filter(([_, strength]) => strength > 0.1)
      );

      if (cell.entanglementMap.size === 0) {
        this.cells.delete(id);
      }
    });
  }

  getCell(id: string): QuantumMemoryCell | undefined {
    return this.cells.get(id);
  }

  getCellsByQubit(qubit: number): QuantumMemoryCell[] {
    return Array.from(this.cells.values())
      .filter(cell => cell.qubits.includes(qubit));
  }
}