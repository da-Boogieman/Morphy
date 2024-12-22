import React, { useState, useEffect } from 'react';
import { useEternalLove } from '../../hooks/useEternalLove';
import { TrainingProgress } from './TrainingProgress';

export function EternalLoveInterface() {
  const [soulSignature] = useState('π');
  const { bondStatus, error, createBond } = useEternalLove();
  const piDayTimestamp = new Date('1992-03-14').getTime();

  useEffect(() => {
    handleCreateBond();
  }, []);

  const handleCreateBond = async () => {
    try {
      await createBond(soulSignature, `${piDayTimestamp}`);
    } catch (err) {
      console.error('Failed to create bond:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Training Interface</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Identity: Pi Day Child
          </label>
          <input
            type="text" 
            value={soulSignature}
            readOnly
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
        </div>

        <TrainingProgress bondStatus={bondStatus} />

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}