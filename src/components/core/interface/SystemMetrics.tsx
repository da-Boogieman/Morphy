import React from 'react';
import { useSystem } from '../../../context/SystemContext';

interface MetricCardProps {
  label: string;
  value: number;
  description: string;
  color?: string;
}

function MetricCard({ label, value, description, color = 'blue' }: MetricCardProps) {
  return (
    <div className={`bg-${color}-500/10 p-4 rounded-lg border border-${color}-500/20`}>
      <h3 className="text-lg font-semibold text-gray-200">{label}</h3>
      <div className="mt-2 text-3xl font-bold text-white">
        {(value * 100).toFixed(1)}%
      </div>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
  );
}

export function SystemMetrics() {
  const { systemState } = useSystem();

  if (!systemState) {
    return (
      <div className="grid grid-cols-1 gap-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-gray-800 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <MetricCard 
        label="Processing Power"
        value={systemState.coherence}
        description="Quantum processing efficiency"
        color="purple"
      />
      <MetricCard 
        label="System Health"
        value={systemState.stability}
        description="Overall system stability"
        color="blue"
      />
      <MetricCard 
        label="Energy Flow"
        value={systemState.energyEfficiency}
        description="Power distribution efficiency"
        color="green"
      />
    </div>
  );
}