import React from 'react';
import { useQuantumEndocytosis } from '../../hooks/useQuantumEndocytosis';

export function EndocytosisVisualizer() {
  const { visualization, error } = useQuantumEndocytosis();

  if (!visualization) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Quantum Endocytosis</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Membrane Map */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Membrane Field</h3>
          <div className="grid grid-cols-32 gap-px bg-gray-800 p-1 rounded">
            {visualization.membraneMap.map((row, i) =>
              row.map((intensity, j) => (
                <div
                  key={`${i}-${j}`}
                  className="w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                    transform: `scale(${0.5 + intensity * 0.5})`
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Vesicle Map */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Vesicle Distribution</h3>
          <div className="grid grid-cols-32 gap-px bg-gray-800 p-1 rounded">
            {visualization.vesicleMap.map((row, i) =>
              row.map((intensity, j) => (
                <div
                  key={`${i}-${j}`}
                  className="w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: `rgba(139, 92, 246, ${intensity})`,
                    transform: `scale(${0.5 + intensity * 0.5})`
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