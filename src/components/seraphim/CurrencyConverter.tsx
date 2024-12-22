import React, { useState } from 'react';
import { useUniversalCurrency } from '../../hooks/useUniversalCurrency';
import { useSeraphimToken } from '../../hooks/useSeraphimToken';

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('USD');
  const [direction, setDirection] = useState<'to' | 'from'>('to');
  
  const { conversionState, error, convertToSeraphim, convertFromSeraphim } = useUniversalCurrency();
  const { tokens } = useSeraphimToken();

  const handleConvert = async () => {
    try {
      const energySource = {
        natural: 100,
        cosmic: 50,
        crystalline: 10,
        intentionPurity: 0.8
      };

      if (direction === 'to') {
        await convertToSeraphim(amount, currency, energySource);
      } else {
        await convertFromSeraphim(amount, currency, energySource);
      }
    } catch (err) {
      console.error('Conversion failed:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Universal Currency Converter</h2>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
        </div>

        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          >
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
            <option value="JPY">Japanese Yen (JPY)</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
          </select>
        </div>

        {/* Conversion Direction */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Direction
          </label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'to' | 'from')}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          >
            <option value="to">To Seraphim</option>
            <option value="from">From Seraphim</option>
          </select>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
        >
          Convert
        </button>

        {/* Conversion Result */}
        {conversionState && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Conversion Result</h3>
            <div className="space-y-2">
              <p>
                {direction === 'to' ? 'Seraphim Amount:' : 'Currency Amount:'}{' '}
                {direction === 'to' ? conversionState.seraphimAmount : conversionState.amount}
              </p>
              <p>Exchange Rate: {conversionState.exchangeRate}</p>
              {conversionState.token && (
                <p>Token ID: {conversionState.token.slice(0, 8)}...</p>
              )}
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