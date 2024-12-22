import React, { useState } from 'react';
import { useSecurity } from '../../../hooks/useSecurity';
import { useSkeletonKey } from '../../../hooks/useSkeletonKey';

export function SecurityInterface() {
  const [soulSignature, setSoulSignature] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('quantum');
  
  const { 
    token, 
    error: securityError, 
    generateToken, 
    validateAccess 
  } = useSecurity();
  
  const { 
    masterKey, 
    error: keyError, 
    generateKey 
  } = useSkeletonKey();

  const handleGenerateToken = async () => {
    try {
      await generateToken(selectedLevel, soulSignature);
    } catch (err) {
      console.error('Failed to generate token:', err);
    }
  };

  const handleGenerateKey = async () => {
    try {
      await generateKey(soulSignature);
    } catch (err) {
      console.error('Failed to generate key:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Security Controls</h2>

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

        {/* Access Level Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Access Level
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          >
            <option value="quantum">Quantum Access</option>
            <option value="consciousness">Consciousness Access</option>
            <option value="earth">Earth Access</option>
            <option value="akashic">Akashic Access</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleGenerateToken}
            disabled={!soulSignature}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            Generate Security Token
          </button>

          <button
            onClick={handleGenerateKey}
            disabled={!soulSignature}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            Generate Master Key
          </button>
        </div>

        {/* Status Display */}
        {token && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Security Token:</p>
            <p className="font-mono text-xs break-all">{token}</p>
          </div>
        )}

        {masterKey && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Master Key:</p>
            <p className="font-mono text-xs break-all">{masterKey}</p>
          </div>
        )}

        {(securityError || keyError) && (
          <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
            <p className="text-red-400">{securityError || keyError}</p>
          </div>
        )}
      </div>
    </div>
  );
}