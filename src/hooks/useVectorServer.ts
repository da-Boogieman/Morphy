import { useState, useEffect } from 'react';
import { VectorServer } from '../services/vectorDb/server/VectorServer';
import type { ServerMetrics } from '../services/vectorDb/server/types';

export function useVectorServer() {
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState<ServerMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  const server = VectorServer.getInstance();

  useEffect(() => {
    const updateMetrics = () => {
      if (isRunning) {
        setMetrics(server.getMetrics());
      }
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const startServer = async () => {
    try {
      await server.start();
      setIsRunning(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start server');
    }
  };

  const stopServer = async () => {
    try {
      await server.stop();
      setIsRunning(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop server');
    }
  };

  return {
    isRunning,
    metrics,
    error,
    startServer,
    stopServer
  };
}