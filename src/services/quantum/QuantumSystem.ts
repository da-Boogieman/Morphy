import { ProbabilityRadiationCore } from './radiation/ProbabilityRadiationCore';

// Add to QuantumSystem class
private radiation = ProbabilityRadiationCore.getInstance();

async processQuantumState(input: Complex[]): Promise<QuantumState> {
  // Apply the trillion dollar equation
  const unifiedField = this.equation.calculateUnifiedField(input);
  
  // Radiate quantum probabilities
  const radiation = await this.radiation.radiateQuantumProbabilities(unifiedField);
  
  // Process through bio-quantum interface
  const bioSignal = await this.convertToBioSignal(radiation.radiatedStates);
  const quantumState = await this.bioInterface.processBioSignal(bioSignal);

  // Enhance with GPU acceleration
  const enhancedState = await this.enhanceStateWithGPU(quantumState);

  return {
    ...enhancedState,
    probabilityField: radiation.probabilityField,
    radiationPattern: radiation.radiationPattern
  };
}