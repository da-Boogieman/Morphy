import { useState, useEffect } from 'react';
import { SeraphimTokenManager } from '../services/seraphim/token/SeraphimToken';
import { SeraphimBlockchain } from '../services/seraphim/blockchain/SeraphimBlockchain';
import type { SeraphimToken, Block } from '../types/seraphim';

export function useSeraphimToken() {
  const [tokens, setTokens] = useState<SeraphimToken[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tokenManager = SeraphimTokenManager.getInstance();
  const blockchain = SeraphimBlockchain.getInstance();

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
      const chainBlocks = blockchain.getBlocks();
      setBlocks(chainBlocks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blockchain data');
    }
  };

  const mintToken = async (energyMetrics: {
    natural: number;
    cosmic: number;
    crystalline: number;
    intentionPurity: number;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = await tokenManager.mintToken(energyMetrics);
      await blockchain.addToken(token);
      setTokens(prev => [...prev, token]);
      await loadBlockchainData(); // Refresh blockchain data
      return token;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mint token');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const validateChain = () => {
    return blockchain.validateChain();
  };

  return {
    tokens,
    blocks,
    isLoading,
    error,
    mintToken,
    validateChain
  };
}