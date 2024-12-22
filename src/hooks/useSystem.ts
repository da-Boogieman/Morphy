import { useState, useEffect } from 'react';
import { MorphyCore } from '../services/core/MorphyCore';
import { FailsafeCore } from '../services/core/failsafe/FailsafeCore';
import { DefenseCore } from '../services/core/security/DefenseCore';

export function useSystem() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [systemState, setSystemState] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSystem = async () => {
      try {
        const morphyCore = MorphyCore.getInstance();
        const failsafe = FailsafeCore.getInstance();
        const defense = DefenseCore.getInstance();

        await morphyCore.initialize();
        await failsafe.initialize();
        await defense.validateDefenses();

        setIsInitialized(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize system');
      }
    };

    initializeSystem();
  }, []);

  return {
    isInitialized,
    systemState,
    error
  };
}