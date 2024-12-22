import { useState, useEffect } from 'react';
import { BridgeServer } from '../services/vectorDb/bridge/BridgeServer';
import type { ServerMetrics } from '../services/vectorDb/server/types';

export function useBridgeServer() {
  const [metrics, setMetrics] = useState<ServerMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const bridge = BridgeServer.getInstance();

  useEffect(() => {
    const updateMetrics = () => {
      try {
        setMetrics(bridge.getMetrics());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      }
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateApiKey = async (clientId: string) => {
    try {
      const key = await bridge.generateApiKey(clientId);
      setApiKey(key);
      setError(null);
      return key;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate API key');
      throw err;
    }
  };

  const sendRequest = async (request: any) => {
    if (!apiKey) {
      throw new Error('No API key available');
    }

    try {
      return await bridge.handleRequest(request, apiKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
      throw err;
    }
  };

  return {
    metrics,
    error,
    apiKey,
    generateApiKey,
    sendRequest
  };
}