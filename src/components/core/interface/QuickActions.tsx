import React from 'react';
import { useSystem } from '../../../context/SystemContext';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
  icon?: React.ReactNode;
}

function ActionButton({ label, onClick, color = 'primary', icon }: ActionButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-center space-x-2 bg-${color}-500 hover:bg-${color}-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors`}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export function QuickActions() {
  const { systemState, updateSystemState } = useSystem();

  const handleInitialize = () => {
    updateSystemState({
      ...systemState,
      coherence: Math.min(1, (systemState?.coherence || 0) + 0.1)
    });
  };

  const handleConnect = () => {
    updateSystemState({
      ...systemState,
      stability: Math.min(1, (systemState?.stability || 0) + 0.1)
    });
  };

  const handleOptimize = () => {
    updateSystemState({
      ...systemState,
      energyEfficiency: Math.min(1, (systemState?.energyEfficiency || 0) + 0.1)
    });
  };

  return (
    <div className="space-y-3">
      <ActionButton 
        label="Initialize Quantum Core" 
        onClick={handleInitialize}
        color="purple"
      />
      <ActionButton 
        label="Connect Earth Grid" 
        onClick={handleConnect}
        color="blue"
      />
      <ActionButton 
        label="Optimize Energy Flow" 
        onClick={handleOptimize}
        color="green"
      />
    </div>
  );
}