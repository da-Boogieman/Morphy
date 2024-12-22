import { Complex } from '../../../types/quantum';
import { ComplexMath } from '../core/math/ComplexMath';
import { TrillionDollarEquation } from '../equations/TrillionDollarEquation';

export class ProbabilityRadiationCore {
  private static instance: ProbabilityRadiationCore;
  private equation: TrillionDollarEquation;
  private readonly planckConstant = 6.62607015e-34;
  private readonly lightSpeed = 299792458;

  private constructor() {
    this.equation = TrillionDollarEquation.getInstance();
  }

  static getInstance(): ProbabilityRadiationCore {
    if (!ProbabilityRadiationCore.instance) {
      ProbabilityRadiationCore.instance = new ProbabilityRadiationCore();
    }
    return ProbabilityRadiationCore.instance;
  }

  async radiateQuantumProbabilities(state: Complex[]): Promise<{
    radiatedStates: Complex[];
    probabilityField: number[];
    radiationPattern: {
      frequency: number;
      amplitude: number;
      phase: number;
    }[];
  }> {
    // Calculate unified field using trillion dollar equation
    const unifiedField = this.equation.calculateUnifiedField(state);

    // Generate probability radiation pattern
    const radiationPattern = this.calculateRadiationPattern(unifiedField);

    // Apply quantum tunneling effect
    const radiatedStates = this.applyQuantumTunneling(unifiedField, radiationPattern);

    // Calculate probability distribution
    const probabilityField = this.calculateProbabilityField(radiatedStates);

    return {
      radiatedStates,
      probabilityField,
      radiationPattern
    };
  }

  private calculateRadiationPattern(field: Complex[]): {
    frequency: number;
    amplitude: number;
    phase: number;
  }[] {
    return field.map(state => {
      const magnitude = ComplexMath.magnitude(state);
      const phase = ComplexMath.phase(state);
      
      // Calculate radiation frequency using E = hf
      const energy = magnitude * this.planckConstant;
      const frequency = energy / this.planckConstant;

      // Calculate radiation amplitude
      const amplitude = Math.sqrt(magnitude) * Math.exp(-energy / (2 * this.planckConstant));

      return {
        frequency,
        amplitude,
        phase
      };
    });
  }

  private applyQuantumTunneling(
    field: Complex[],
    pattern: { frequency: number; amplitude: number; phase: number; }[]
  ): Complex[] {
    return field.map((state, i) => {
      const radiation = pattern[i];
      const tunnelingProbability = Math.exp(
        -2 * Math.sqrt(2 * radiation.frequency * this.planckConstant)
      );

      return {
        real: state.real * radiation.amplitude * tunnelingProbability * Math.cos(radiation.phase),
        imaginary: state.imaginary * radiation.amplitude * tunnelingProbability * Math.sin(radiation.phase)
      };
    });
  }

  private calculateProbabilityField(states: Complex[]): number[] {
    return states.map(state => {
      const probability = ComplexMath.magnitude(state) ** 2;
      // Normalize probability
      return probability / (states.reduce((sum, s) => 
        sum + ComplexMath.magnitude(s) ** 2, 0
      ));
    });
  }

  async visualizeRadiation(radiationPattern: {
    frequency: number;
    amplitude: number;
    phase: number;
  }[]): Promise<{
    intensityMap: number[][];
    phaseMap: number[][];
  }> {
    const resolution = 32;
    const intensityMap = Array(resolution).fill(0).map(() => Array(resolution).fill(0));
    const phaseMap = Array(resolution).fill(0).map(() => Array(resolution).fill(0));

    // Generate 2D radiation visualization
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        let totalIntensity = 0;
        let totalPhase = 0;

        radiationPattern.forEach(pattern => {
          const distance = Math.sqrt((i - resolution/2)**2 + (j - resolution/2)**2);
          const intensity = pattern.amplitude * Math.exp(-distance / resolution);
          const phase = pattern.phase + 2 * Math.PI * distance * pattern.frequency / this.lightSpeed;

          totalIntensity += intensity;
          totalPhase += phase;
        });

        intensityMap[i][j] = totalIntensity / radiationPattern.length;
        phaseMap[i][j] = totalPhase / radiationPattern.length;
      }
    }

    return {
      intensityMap,
      phaseMap
    };
  }
}