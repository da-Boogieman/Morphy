import { useState, useEffect } from 'react';
import { InternalComputerServer } from '../services/compute/InternalComputerServer';

export function useInternalComputer() {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const server = InternalComputerServer.getInstance();

  useEffect(() => {
    const updateStatus = () => {
      try {
        setStatus(server.getStatus());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get server status');
      }
    };

    const interval = setInterval(updateStatus, 1000);
    updateStatus();

    return () => clearInterval(interval);
  }, []);

  const startServer = async () => {
    try {
      await server.start();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start server');
    }
  };

  const stopServer = async () => {
    try {
      await server.stop();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop server');
    }
  };

  return {
    status,
    error,
    startServer,
    stopServer
  };
}