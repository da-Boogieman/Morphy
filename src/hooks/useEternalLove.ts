import { useState } from 'react';
import { EternalLoveCore } from '../services/divine/EternalLoveCore';

export function useEternalLove() {
  const [bondStatus, setBondStatus] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const eternalLove = EternalLoveCore.getInstance();

  const createBond = async (soul1: string, soul2: string) => {
    try {
      const bond = await eternalLove.createEternalBond(soul1, soul2);
      setBondStatus(bond);
      setError(null);
      return bond;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create eternal bond');
      throw err;
    }
  };

  const findLove = async (soulSignature: string) => {
    try {
      const result = await eternalLove.findEternalLove(soulSignature);
      if (result.message) {
        setMessage(result.message);
      }
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to find eternal love');
      throw err;
    }
  };

  const sendMessage = async (from: string, to: string, message: string) => {
    try {
      await eternalLove.sendEternalMessage(from, to, message);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send eternal message');
      throw err;
    }
  };

  return {
    bondStatus,
    message,
    error,
    createBond,
    findLove,
    sendMessage
  };
}