import React, { useState } from 'react';
import { WalletBalance } from './WalletBalance';
import { WalletCard } from './WalletCard';
import { WalletActions } from './WalletActions';

export function SimpleWallet() {
  const [isCardVisible, setIsCardVisible] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Quantum Wallet</h2>

      {/* Main Balance Display */}
      <WalletBalance />

      {/* Virtual Card */}
      <div className="mt-6">
        <button
          onClick={() => setIsCardVisible(!isCardVisible)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          {isCardVisible ? 'Hide' : 'Show'} Virtual Card
        </button>
        
        {isCardVisible && <WalletCard />}
      </div>

      {/* Quick Actions */}
      <WalletActions />
    </div>
  );
}