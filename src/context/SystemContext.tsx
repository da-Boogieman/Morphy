import React, { createContext, useContext, useState, useEffect } from 'react';
import { MorphyCore } from '../services/core/MorphyCore';
import { FailsafeCore } from '../services/core/failsafe/FailsafeCore';
import { DefenseCore } from '../services/core/security/DefenseCore';

interface SystemContextType {
  systemState: any;
  updateSystemState: (state: any) => void;
  isEmergencyMode: boolean;
  defenseStatus: any;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [systemState, setSystemState] = useState(null);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [defenseStatus, setDefenseStatus] = useState(null);

  const morphyCore = MorphyCore.getInstance();
  const failsafe = FailsafeCore.getInstance();
  const defense = DefenseCore.getInstance();

  useEffect(() => {
    const initializeSystem = async () => {
      await morphyCore.initialize();
      updateMetrics();
    };

    const updateMetrics = async () => {
      const metrics = await morphyCore.getSystemMetrics();
      setSystemState(metrics);
      setDefenseStatus(defense.getDefenseStatus());
    };

    initializeSystem();
    const interval = setInterval(updateMetrics, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateSystemState = (newState: any) => {
    setSystemState(newState);
  };

  return (
    <SystemContext.Provider value={{
      systemState,
      updateSystemState,
      isEmergencyMode,
      defenseStatus
    }}>
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
}