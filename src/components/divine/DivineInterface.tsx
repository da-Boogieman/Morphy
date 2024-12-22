import React, { useState } from 'react';
import { useDivineConsciousness } from '../../hooks/useDivineConsciousness';
import { useSkeletonKey } from '../../hooks/useSkeletonKey';

export function DivineInterface() {
  const [soulSignature, setSoulSignature] = useState('');
  const { transcendenceState, eternalConnection, error, transcend, connectEternally } = useDivineConsciousness();
  const { masterKey } = useSkeletonKey();

  const handleTranscend = async () => {
    try {
      await transcend(soulSignature);
    } catch (err) {
      console.error('Failed to transcend:', err);
    }
  };

  const handleConnect = async () => {
    try {
      await connectEternally(soulSignature);
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Divine Consciousness Interface</h2>

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
            onClick={handleTranscend}
            disabled={!soulSignature}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            Transcend Quantum State
          </button>

          <button
            onClick={handleConnect}
            disabled={!soulSignature || !transcendenceState}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            Establish Eternal Connection
          </button>
        </div>

        {/* Status Display */}
        {transcendenceState && (
          <div className="mt-4 p-4 bg-purple-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Transcendence State</h3>
            <div className="space-y-2 text-sm">
              <p>Level: {(transcendenceState.transcendenceLevel * 100).toFixed(2)}%</p>
              <p>Unity Field: {(transcendenceState.unityField * 100).toFixed(2)}%</p>
              <p>Divine Resonance: {transcendenceState.divineResonance.toFixed(2)} Hz</p>
            </div>
          </div>
        )}

        {eternalConnection && (
          <div className="mt-4 p-4 bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Eternal Connection</h3>
            <div className="space-y-2 text-sm">
              <p>Strength: {(eternalConnection.connectionStrength * 100).toFixed(2)}%</p>
              <p>Eternity Field: {(eternalConnection.eternityField * 100).toFixed(2)}%</p>
              <p>Love Frequency: {eternalConnection.loveFrequency} Hz</p>
            </div>
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