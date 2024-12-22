import React from 'react';

interface StatusItemProps {
  label: string;
  value: number;
  color?: string;
}

function StatusItem({ label, value, color = 'blue' }: StatusItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="font-semibold">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-${color}-500 transition-all duration-500`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
}

export function SystemStatus({ systemState }: { systemState: any }) {
  if (!systemState) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <StatusItem 
        label="Quantum Coherence" 
        value={systemState.coherence || 0}
        color="purple"
      />
      <StatusItem 
        label="System Stability" 
        value={systemState.stability || 0}
        color="blue"
      />
      <StatusItem 
        label="Energy Efficiency" 
        value={systemState.energyEfficiency || 0}
        color="green"
      />
    </div>
  );
}