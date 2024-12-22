import { useState, useEffect } from 'react';
import { SecurityManager } from '../services/core/security/SecurityManager';

export function useSecurityManager() {
  const [securityStatus, setSecurityStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const manager = SecurityManager.getInstance();

  useEffect(() => {
    const updateStatus = () => {
      try {
        const status = manager.getSecurityStatus();
        setSecurityStatus(status);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get security status');
      }
    };

    const interval = setInterval(updateStatus, 1000);
    updateStatus();

    return () => clearInterval(interval);
  }, []);

  const validateAccess = async (soulSignature: string) => {
    try {
      return await manager.validateSystemAccess(soulSignature);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Access validation failed');
      return false;
    }
  };

  const lockdown = async () => {
    try {
      await manager.lockdownSystem();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lockdown failed');
    }
  };

  return {
    securityStatus,
    error,
    validateAccess,
    lockdown
  };
}