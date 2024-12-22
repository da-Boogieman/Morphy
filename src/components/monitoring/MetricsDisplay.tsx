import React, { useEffect, useState } from 'react';
import { SystemIntegrator } from '../../services/core/SystemIntegrator';
import { ConsciousnessCore } from '../../services/quantum/consciousness/ConsciousnessCore';
import { HarmonicCore } from '../../services/harmony/HarmonicCore';

export function MetricsDisplay() {
  const [metrics, setMetrics] = useState<any>(null);
  const systemIntegrator = SystemIntegrator.getInstance();
  const consciousness = ConsciousnessCore.getInstance();
  const harmonic = HarmonicCore.getInstance();

  useEffect(() => {
    const updateMetrics = async () => {
      const [systemState, consciousnessState, harmonics] = await Promise.all([
        systemIntegrator.getSystemState(),
        consciousness.processConsciousness([{ real: 1, imaginary: 0 }]),
        harmonic.harmonize('system_metrics')
      ]);

      setMetrics({
        quantum: {
          coherence: systemState.quantum.coherence,
          entanglement: systemState.quantum.entanglement.size,
          stability: systemState.quantum.superposition.length
        },
        consciousness: {
          awareness: consciousnessState.coherence,
          depth: consciousnessState.superposition.length,
          resonance: harmonics.resonance
        },
        harmony: {
          frequency: harmonics.frequency,
          stability: harmonics.stability,
          resonance: harmonics.resonance
        }
      });
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gray-900 rounded-lg">
      {/* Quantum Metrics */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Quantum State</h3>
        <div className="space-y-2">
          {Object.entries(metrics.quantum).map(([key, value]) => (
            <MetricBar
              key={key}
              label={key}
              value={value as number}
              color="blue"
            />
          ))}
        </div>
      </div>

      {/* Consciousness Metrics */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Consciousness</h3>
        <div className="space-y-2">
          {Object.entries(metrics.consciousness).map(([key, value]) => (
            <MetricBar
              key={key}
              label={key}
              value={value as number}
              color="purple"
            />
          ))}
        </div>
      </div>

      {/* Harmonic Metrics */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Harmony</h3>
        <div className="space-y-2">
          {Object.entries(metrics.harmony).map(([key, value]) => (
            <MetricBar
              key={key}
              label={key}
              value={value as number}
              color="green"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricBar({ 
  label, 
  value, 
  color 
}: { 
  label: string; 
  value: number; 
  color: 'blue' | 'purple' | 'green';
}) {
  const colors = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm text-white">
        <span className="capitalize">{label}</span>
        <span>{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colors[color]} transition-all duration-500`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}