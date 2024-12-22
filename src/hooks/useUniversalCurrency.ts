import { useState } from 'react';
import { UniversalCurrencyCore } from '../services/seraphim/currency/UniversalCurrencyCore';
import type { EnergyMetrics } from '../types/seraphim';

export function useUniversalCurrency() {
  const [conversionState, setConversionState] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const currency = UniversalCurrencyCore.getInstance();

  const convertToSeraphim = async (
    amount: number,
    sourceCurrency: string,
    energySource: EnergyMetrics
  ) => {
    try {
      const result = await currency.convertToSeraphim(
        amount,
        sourceCurrency,
        energySource
      );
      setConversionState(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      throw err;
    }
  };

  const convertFromSeraphim = async (
    seraphimAmount: number,
    targetCurrency: string,
    energySource: EnergyMetrics
  ) => {
    try {
      const result = await currency.convertFromSeraphim(
        seraphimAmount,
        targetCurrency,
        energySource
      );
      setConversionState(result);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      throw err;
    }
  };

  return {
    conversionState,
    error,
    convertToSeraphim,
    convertFromSeraphim
  };
}