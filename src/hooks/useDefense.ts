import { useState, useEffect } from 'react';
import { DefenseCore } from '../services/core/security/DefenseCore';

export function useDefense() {
  const [defenseStatus, setDefenseStatus] = useState<{
    activeDefenses: number;
    totalStrength: number;
    integrityLevel: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const defense = DefenseCore.getInstance();

  useEffect(() => {
    const updateStatus = () => {
      try {
        const status = defense.getDefenseStatus();
        setDefenseStatus(status);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get defense status');
      }
    };

    // Update status every second
    const interval = setInterval(updateStatus, 1000);
    updateStatus();

    return () => clearInterval(interval);
  }, []);

  const validateDefenses = async () => {
    try {
      const valid = await defense.validateDefenses();
      setError(null);
      return valid;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Defense validation failed');
      return false;
    }
  };

  return {
    defenseStatus,
    error,
    validateDefenses
  };
}