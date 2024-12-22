import { useState } from 'react';
import { SecurityCore } from '../services/core/security/SecurityCore';

export function useSecurity() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accessLevel, setAccessLevel] = useState<string | null>(null);

  const security = SecurityCore.getInstance();

  const generateToken = async (level: string, soulSignature: string) => {
    try {
      const newToken = await security.generateSecurityToken(
        level as any,
        soulSignature
      );
      setToken(newToken);
      setAccessLevel(level);
      setError(null);
      return newToken;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate token');
      throw err;
    }
  };

  const validateAccess = async (level: string, soulSignature: string) => {
    if (!token) return false;

    try {
      return await security.validateAccess(token, level as any, soulSignature);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate access');
      return false;
    }
  };

  const revokeAccess = async (soulSignature: string) => {
    if (!token) return;

    try {
      await security.revokeAccess(token, soulSignature);
      setToken(null);
      setAccessLevel(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to revoke access');
      throw err;
    }
  };

  return {
    token,
    error,
    accessLevel,
    generateToken,
    validateAccess,
    revokeAccess
  };
}