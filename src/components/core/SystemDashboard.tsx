import React, { useState, useEffect } from 'react';
import { MorphyCore } from '../../services/core/MorphyCore';
import { SystemMonitor } from '../system/SystemMonitor';
import { QuantumVisualizer } from '../quantum/QuantumVisualizer';
import { ElementalGrid } from '../elements/ElementalGrid';
import { HarmonicDisplay } from '../harmony/HarmonicDisplay';

export function SystemDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const morphyCore = MorphyCore.getInstance();

  useEffect(() => {
    const initializeSystem = async () => {
      await morphyCore.initialize();
      const systemMetrics = await morphyCore.getSystemMetrics();
      setMetrics(systemMetrics);
    };

    initializeSystem();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* System Overview */}
      <div className="col-span-12 bg-white/5 rounded-lg p-6 backdrop-blur-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">System Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          {metrics && Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="bg-white/10 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white/80 mb-2">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h3>
              <p className="text-2xl font-bold text-white">
                {typeof value === 'number' ? (value * 100).toFixed(2) + '%' : value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quantum State */}
      <div className="col-span-6 bg-white/5 rounded-lg p-6 backdrop-blur-lg">
        <QuantumVisualizer />
      </div>

      {/* Elemental Forces */}
      <div className="col-span-6 bg-white/5 rounded-lg p-6 backdrop-blur-lg">
        <ElementalGrid />
      </div>

      {/* Harmonic Resonance */}
      <div className="col-span-12 bg-white/5 rounded-lg p-6 backdrop-blur-lg">
        <HarmonicDisplay />
      </div>

      {/* System Monitor */}
      <div className="col-span-12 bg-white/5 rounded-lg p-6 backdrop-blur-lg">
        <SystemMonitor />
      </div>
    </div>
  );
}