import { useState, useEffect } from 'react';
import { FailsafeCore } from '../services/core/failsafe/FailsafeCore';

export function useFailsafe() {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [lastIncident, setLastIncident] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState<'stable' | 'recovering' | 'critical'>('stable');

  useEffect(() => {
    const failsafe = FailsafeCore.getInstance();

    const handleEmergency = (reason: string) => {
      setIsEmergencyMode(true);
      setLastIncident(reason);
      setSystemStatus('critical');
    };

    const handleRecovery = () => {
      setIsEmergencyMode(false);
      setSystemStatus('stable');
    };

    // Subscribe to events
    failsafe.on('emergency', handleEmergency);
    failsafe.on('recovery', handleRecovery);

    return () => {
      // Cleanup
      failsafe.removeListener('emergency', handleEmergency);
      failsafe.removeListener('recovery', handleRecovery);
    };
  }, []);

  return {
    isEmergencyMode,
    lastIncident,
    systemStatus
  };
}