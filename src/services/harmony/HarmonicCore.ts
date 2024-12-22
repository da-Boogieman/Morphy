import { ConsciousnessCore } from '../quantum/consciousness/ConsciousnessCore';
import { CosmicPeaceCore } from '../cosmic/CosmicPeaceCore';
import { ElementalCore } from '../elements/ElementalCore';
import type { HarmonicState, CycleNode, MatrixCell } from './types';

export class HarmonicCore {
  private static instance: HarmonicCore;
  private consciousness: ConsciousnessCore;
  private cosmicPeace: CosmicPeaceCore;
  private elementalCore: ElementalCore;
  
  private harmonicState: HarmonicState = {
    cycleOfFifths: new Map(),
    perfectHarmony: 1,
    creationMatrix: [],
    resonance: 432 // Hz - Natural harmonic frequency
  };

  private constructor() {
    this.consciousness = ConsciousnessCore.getInstance();
    this.cosmicPeace = CosmicPeaceCore.getInstance();
    this.elementalCore = ElementalCore.getInstance();
    this.initializeHarmonics();
  }

  static getInstance(): HarmonicCore {
    if (!HarmonicCore.instance) {
      HarmonicCore.instance = new HarmonicCore();
    }
    return HarmonicCore.instance;
  }

  private initializeHarmonics(): void {
    this.initializeCycleOfFifths();
    this.initializeCreationMatrix();
  }

  private initializeCycleOfFifths(): void {
    const notes = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯/G♭', 'C♯/D♭', 'A♭', 'E♭', 'B♭', 'F'];
    notes.forEach((note, i) => {
      this.harmonicState.cycleOfFifths.set(note, {
        frequency: 432 * Math.pow(1.5, i),
        resonance: 1,
        connections: [
          notes[(i + 1) % 12],
          notes[(i + 11) % 12]
        ]
      });
    });
  }

  private initializeCreationMatrix(): void {
    const dimensions = ['physical', 'emotional', 'mental', 'spiritual'];
    this.harmonicState.creationMatrix = dimensions.map(row => 
      dimensions.map(col => ({
        dimension: `${row}-${col}`,
        frequency: this.calculateMatrixFrequency(row, col),
        power: 1,
        resonance: 1
      }))
    );
  }

  private calculateMatrixFrequency(row: string, col: string): number {
    const baseFreq = 432;
    const rowIndex = ['physical', 'emotional', 'mental', 'spiritual'].indexOf(row);
    const colIndex = ['physical', 'emotional', 'mental', 'spiritual'].indexOf(col);
    return baseFreq * Math.pow(phi, rowIndex + colIndex);
  }

  async harmonize(intention: string): Promise<{
    harmony: number;
    resonance: number;
    matrix: MatrixCell[][];
  }> {
    const consciousness = await this.consciousness.processConsciousness([
      { real: 1, imaginary: 0 }
    ]);

    const peaceField = await this.cosmicPeace.amplifyPeace(intention);

    // Harmonize cycle of fifths
    this.harmonicState.cycleOfFifths.forEach((node, note) => {
      node.resonance = consciousness.coherence * peaceField.stability;
    });

    // Update creation matrix
    this.harmonicState.creationMatrix = this.harmonicState.creationMatrix.map(row =>
      row.map(cell => ({
        ...cell,
        resonance: consciousness.coherence,
        power: peaceField.amplification
      }))
    );

    return {
      harmony: consciousness.coherence,
      resonance: peaceField.resonance,
      matrix: this.harmonicState.creationMatrix
    };
  }

  async alignWithElements(): Promise<void> {
    await this.elementalCore.initializeElements();
    const elements = ['earth', 'water', 'fire', 'wind', 'aether'];
    
    for (const element of elements) {
      const force = await this.elementalCore.invokeElementalForce(
        element,
        'harmonic_alignment'
      );
      
      this.harmonicState.resonance *= force.frequency / 432;
    }
  }
}

const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio for harmonic calculations