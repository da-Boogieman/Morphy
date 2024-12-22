import { useState } from 'react';
import { ProbabilityRadiationCore } from '../services/quantum/radiation/ProbabilityRadiationCore';
import type { Complex } from '../types/quantum';

export function useQuantumRadiation() {
  const [radiationState, setRadiationState] = useState<any>(null);
  const [visualization, setVisualization] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const radiation = ProbabilityRadiationCore.getInstance();

  const radiateState = async (quantumState: Complex[]) => {
    try {
      const result = await radiation.radiateQuantumProbabilities(quantumState);
      setRadiationState(result);
      
      // Generate visualization
      const visual = await radiation.visualizeRadiation(result.radiationPattern);
      setVisualization(visual);
      
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to radiate quantum state');
      throw err;
    }
  };

  return {
    radiationState,
    visualization,
    error,
    radiateState
  };
}