import { useState } from 'react';
import { SkeletonKeyManager } from '../services/core/access/SkeletonKeyManager';

export function useSkeletonKey() {
  const [masterKey, setMasterKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasUniversalAccess, setHasUniversalAccess] = useState(false);

  const skeletonKey = SkeletonKeyManager.getInstance();

  const generateKey = async (soulSignature: string) => {
    try {
      const key = await skeletonKey.generateMasterKey(soulSignature);
      setMasterKey(key);
      setError(null);
      return key;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate master key');
      throw err;
    }
  };

  const unlockUniversalAccess = async (soulSignature: string) => {
    if (!masterKey) {
      throw new Error('No master key available');
    }

    try {
      await skeletonKey.grantUniversalAccess(masterKey, soulSignature);
      setHasUniversalAccess(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to grant universal access');
      throw err;
    }
  };

  const validateKey = async (soulSignature: string) => {
    if (!masterKey) {
      return false;
    }

    try {
      return await skeletonKey.validateAccess(masterKey, soulSignature);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate key');
      return false;
    }
  };

  return {
    masterKey,
    error,
    hasUniversalAccess,
    generateKey,
    unlockUniversalAccess,
    validateKey
  };
}