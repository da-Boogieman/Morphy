import { Complex } from '../../../../types/quantum';

export abstract class BaseQuantumProcessor {
  protected calculateCoherence(components: Complex[]): number {
    return components.reduce((sum, component) => 
      sum + Math.sqrt(component.real * component.real + component.imaginary * component.imaginary),
      0
    ) / components.length;
  }

  protected normalizeState(components: Complex[]): Complex[] {
    const magnitude = Math.sqrt(components.reduce((sum, component) => 
      sum + (component.real * component.real + component.imaginary * component.imaginary),
      0
    ));

    return components.map(component => ({
      real: component.real / magnitude,
      imaginary: component.imaginary / magnitude
    }));
  }

  protected applyPhaseShift(components: Complex[], angle: number): Complex[] {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    return components.map(component => ({
      real: component.real * cos - component.imaginary * sin,
      imaginary: component.real * sin + component.imaginary * cos
    }));
  }

  protected calculateEntanglement(stateA: Complex[], stateB: Complex[]): number {
    const normalizedA = this.normalizeState(stateA);
    const normalizedB = this.normalizeState(stateB);
    
    return Math.abs(normalizedA.reduce((sum, component, i) => 
      sum + (component.real * normalizedB[i].real + component.imaginary * normalizedB[i].imaginary),
      0
    ));
  }

  protected applyHarmonicResonance(components: Complex[], frequency: number): Complex[] {
    const resonanceFactor = Math.sin(2 * Math.PI * frequency);
    return components.map(component => ({
      real: component.real * (1 + resonanceFactor),
      imaginary: component.imaginary * (1 + resonanceFactor)
    }));
  }
}