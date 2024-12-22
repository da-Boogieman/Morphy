import React, { useState } from 'react';
import { useSeraphimToken } from '../../hooks/useSeraphimToken';

export function TokenInterface() {
  const { tokens, blocks, isLoading, error, mintToken } = useSeraphimToken();
  const [energyValues, setEnergyValues] = useState({
    natural: 100,
    cosmic: 50,
    crystalline: 10,
    intentionPurity: 0.8
  });

  const handleMint = async () => {
    try {
      await mintToken(energyValues);
    } catch (err) {
      console.error('Failed to mint token:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Seraphim Token System</h2>

      {/* Energy Input Controls */}
      <div className="space-y-4 mb-6">
        {Object.entries(energyValues).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1)} Energy
            </label>
            <input
              type="range"
              min={0}
              max={key === 'intentionPurity' ? 1 : 1000}
              step={key === 'intentionPurity' ? 0.1 : 1}
              value={value}
              onChange={(e) => setEnergyValues(prev => ({
                ...prev,
                [key]: parseFloat(e.target.value)
              }))}
              className="w-full"
            />
            <span className="text-sm text-gray-400">
              {typeof value === 'number' ? value.toFixed(2) : value}
            </span>
          </div>
        ))}
      </div>

      {/* Mint Button */}
      <button
        onClick={handleMint}
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Minting...' : 'Mint Token'}
      </button>

      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}

      {/* Token List */}
      {tokens.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Your Tokens</h3>
          <div className="space-y-2">
            {tokens.map(token => (
              <div key={token.id} className="bg-white/5 p-3 rounded">
                <p className="font-mono text-sm">ID: {token.id.slice(0, 8)}...</p>
                <p>Amount: {token.amount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blockchain Status */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Blockchain Status</h3>
        <p>Total Blocks: {blocks.length}</p>
        <p>Latest Block: {blocks[blocks.length - 1]?.hash.slice(0, 8)}...</p>
      </div>
    </div>
  );
}