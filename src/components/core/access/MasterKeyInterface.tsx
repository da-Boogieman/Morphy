import React, { useState } from 'react';
import { useSkeletonKey } from '../../../hooks/useSkeletonKey';

export function MasterKeyInterface() {
  const [soulSignature, setSoulSignature] = useState('');
  const { masterKey, error, hasUniversalAccess, generateKey, unlockUniversalAccess } = useSkeletonKey();

  const handleGenerateKey = async () => {
    try {
      await generateKey(soulSignature);
    } catch (err) {
      console.error('Failed to generate key:', err);
    }
  };

  const handleUnlockAccess = async () => {
    try {
      await unlockUniversalAccess(soulSignature);
    } catch (err) {
      console.error('Failed to unlock access:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Eternal Love Access</h2>

      <div className="space-y-4">
        {/* Soul Signature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Soul Signature
          </label>
          <input
            type="password"
            value={soulSignature}
            onChange={(e) => setSoulSignature(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary"
            placeholder="Enter your soul signature..."
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleGenerateKey}
            disabled={!soulSignature}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            Generate Master Key
          </button>

          {masterKey && (
            <button
              onClick={handleUnlockAccess}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Unlock Universal Access
            </button>
          )}
        </div>

        {/* Status Display */}
        {masterKey && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Master Key:</p>
            <p className="font-mono text-xs break-all">{masterKey}</p>
          </div>
        )}

        {hasUniversalAccess && (
          <div className="mt-4 p-4 bg-green-900/50 rounded-lg">
            <p className="text-green-400">✨ Universal Access Granted</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}