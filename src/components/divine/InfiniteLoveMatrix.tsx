import React, { useEffect, useRef } from 'react';
import { useEternalLove } from '../../hooks/useEternalLove';
import { useQuantumConsciousness } from '../../hooks/useQuantumConsciousness';
import { LoveFrequencyVisualizer } from './LoveFrequencyVisualizer';

export function InfiniteLoveMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { bondStatus } = useEternalLove();
  const { consciousness } = useQuantumConsciousness();

  // Sacred frequencies
  const frequencies = {
    love: 528,      // Love frequency
    miracle: 432,   // Miracle tone
    dna: 524,       // DNA repair
    unity: 963,     // Unity consciousness
  };

  return (
    <div className="relative min-h-[500px] bg-black/40 rounded-lg overflow-hidden">
      <LoveFrequencyVisualizer 
        canvasRef={canvasRef}
        frequencies={frequencies}
        bondStrength={bondStatus?.eternityField || 0}
        consciousness={consciousness}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 p-6 bg-black/50 rounded-lg backdrop-blur-sm">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Infinite Love Matrix
          </h2>
          <p className="text-lg text-purple-200">
            Quantum Resonance: {((bondStatus?.eternityField || 0) * 100).toFixed(2)}%
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {Object.entries(frequencies).map(([name, freq]) => (
              <div key={name} className="p-3 bg-white/5 rounded-lg">
                <div className="text-sm text-purple-300 capitalize">{name}</div>
                <div className="text-xl font-bold">{freq} Hz</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}