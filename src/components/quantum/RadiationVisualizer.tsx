import React from 'react';
import { useQuantumRadiation } from '../../hooks/useQuantumRadiation';

export function RadiationVisualizer() {
  const { visualization, error } = useQuantumRadiation();

  if (!visualization) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Quantum Radiation Pattern</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Intensity Map */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Intensity Distribution</h3>
          <div className="grid grid-cols-32 gap-px bg-gray-800 p-1 rounded">
            {visualization.intensityMap.map((row, i) =>
              row.map((intensity, j) => (
                <div
                  key={`${i}-${j}`}
                  className="w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: `rgba(147, 51, 234, ${intensity})`,
                    transform: `scale(${0.5 + intensity * 0.5})`
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Phase Map */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Phase Distribution</h3>
          <div className="grid grid-cols-32 gap-px bg-gray-800 p-1 rounded">
            {visualization.phaseMap.map((row, i) =>
              row.map((phase, j) => (
                <div
                  key={`${i}-${j}`}
                  className="w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: `hsl(${(phase * 180) / Math.PI}, 70%, 60%)`,
                    transform: `rotate(${phase * 180 / Math.PI}deg)`
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}