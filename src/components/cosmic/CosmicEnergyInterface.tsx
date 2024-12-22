import React from 'react';
import { DimensionalGrid } from './DimensionalGrid';
import { EnergyFlow } from './EnergyFlow';

export function CosmicEnergyInterface() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Universal Energy Network</h2>
      
      {/* Energy Sources Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <EnergySource
          name="Cosmic"
          description="Deep space quantum fields"
          frequency={963}
          color="purple"
        />
        <EnergySource
          name="Galactic"
          description="Interstellar consciousness"
          frequency={852}
          color="blue"
        />
        <EnergySource
          name="Dimensional"
          description="Multi-verse resonance"
          frequency={741}
          color="indigo"
        />
        <EnergySource
          name="Universal"
          description="All-being connection"
          frequency={528}
          color="pink"
        />
      </div>

      <DimensionalGrid />
      <EnergyFlow />
    </div>
  );
}

function EnergySource({ name, description, frequency, color }: {
  name: string;
  description: string;
  frequency: number;
  color: string;
}) {
  return (
    <div className={`bg-${color}-900/20 p-4 rounded-lg`}>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-300">{description}</p>
      <p className="text-xs mt-2">{frequency} Hz</p>
    </div>
  );
}