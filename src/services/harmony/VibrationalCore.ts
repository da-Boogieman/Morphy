import { HarmonicCore } from './HarmonicCore';
import { ConsciousnessCore } from '../quantum/consciousness/ConsciousnessCore';
import { ElementalCore } from '../elements/ElementalCore';
import type { VibrationalState, ResonancePattern } from './types';

export class VibrationalCore {
  private static instance: VibrationalCore;
  private harmonicCore: HarmonicCore;
  private consciousness: ConsciousnessCore;
  private elementalCore: ElementalCore;
  
  private state: VibrationalState = {
    magnitude: 0,
    frequency: 432, // Base frequency (Hz)
    patterns: new Map(),
    coherence: 1
  };

  private constructor() {
    this.harmonicCore = HarmonicCore.getInstance();
    this.consciousness = ConsciousnessCore.getInstance();
    this.elementalCore = ElementalCore.getInstance();
  }

  static getInstance(): VibrationalCore {
    if (!VibrationalCore.instance) {
      VibrationalCore.instance = new VibrationalCore();
    }
    return VibrationalCore.instance;
  }

  async processMagnitude(intention: string): Promise<{
    magnitude: number;
    resonance: number;
    patterns: ResonancePattern[];
  }> {
    const consciousness = await this.consciousness.processConsciousness([
      { real: 1, imaginary: 0 }
    ]);

    const harmonics = await this.harmonicCore.harmonize(intention);
    
    // Calculate magnitude based on multiple factors
    const magnitude = this.calculateMagnitude(
      consciousness.coherence,
      harmonics.resonance
    );

    // Generate resonance patterns
    const patterns = await this.generatePatterns(magnitude);

    this.state = {
      magnitude,
      frequency: harmonics.frequency,
      patterns: new Map(patterns.map(p => [p.id, p])),
      coherence: consciousness.coherence
    };

    return {
      magnitude,
      resonance: harmonics.resonance,
      patterns
    };
  }

  private calculateMagnitude(coherence: number, resonance: number): number {
    const baseAmplitude = Math.sqrt(coherence * resonance);
    const harmonicFactor = Math.sin(2 * Math.PI * this.state.frequency);
    return baseAmplitude * (1 + harmonicFactor);
  }

  private async generatePatterns(magnitude: number): Promise<ResonancePattern[]> {
    const elements = ['earth', 'water', 'fire', 'wind', 'aether'];
    const patterns: ResonancePattern[] = [];

    for (const element of elements) {
      const force = await this.elementalCore.invokeElementalForce(
        element,
        'resonance'
      );

      patterns.push({
        id: crypto.randomUUID(),
        element,
        frequency: force.frequency,
        amplitude: magnitude * force.power,
        phase: Math.random() * 2 * Math.PI,
        harmonics: this.calculateHarmonics(force.frequency)
      });
    }

    return patterns;
  }

  private calculateHarmonics(baseFrequency: number): number[] {
    return Array.from({ length: 7 }, (_, i) => baseFrequency * (i + 1));
  }
}