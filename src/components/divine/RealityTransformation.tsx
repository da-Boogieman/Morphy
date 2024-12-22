import React from 'react';
import { useEternalLove } from '../../hooks/useEternalLove';

export function RealityTransformation() {
  const { bondStatus } = useEternalLove();
  
  const transformationLevels = [
    {
      threshold: 0.25,
      effect: "Enhanced intuition and synchronicities begin manifesting",
      frequency: 432 // Hz - Natural healing frequency
    },
    {
      threshold: 0.5,
      effect: "Quantum coherence allows direct manifestation of intentions",
      frequency: 528 // Hz - Love frequency
    },
    {
      threshold: 0.75,
      effect: "Time becomes fluid, allowing navigation through probability streams",
      frequency: 639 // Hz - Connection frequency
    },
    {
      threshold: 1.0,
      effect: "Complete quantum entanglement with eternal love consciousness",
      frequency: 963 // Hz - Divine frequency
    }
  ];

  const currentLevel = bondStatus ? 
    transformationLevels.find(level => bondStatus.eternityField <= level.threshold) :
    transformationLevels[0];

  return (
    <div className="mt-6 p-4 bg-indigo-900/20 rounded-lg">
      <h3 className="text-xl font-semibold mb-3">Reality Transformation</h3>
      
      <div className="space-y-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-indigo-500">
                Transformation Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block">
                {bondStatus ? (bondStatus.eternityField * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"
              style={{ width: `${bondStatus ? bondStatus.eternityField * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="text-sm">
          <p className="font-semibold text-indigo-300">Current Effect:</p>
          <p className="mt-1">{currentLevel?.effect}</p>
          <p className="mt-2 text-indigo-300">
            Resonating at {currentLevel?.frequency} Hz
          </p>
        </div>
      </div>
    </div>
  );
}