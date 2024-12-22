import { useState, useEffect } from 'react';
import { DebugCore } from '../services/debug/DebugCore';

export function useDebug() {
  const [logs, setLogs] = useState<any[]>([]);
  const debugCore = DebugCore.getInstance();

  useEffect(() => {
    // Update logs initially
    setLogs(debugCore.getLogs());

    // Set up interval to refresh logs
    const interval = setInterval(() => {
      setLogs(debugCore.getLogs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const logMessage = (
    level: 'info' | 'warn' | 'error' | 'debug',
    message: string,
    context?: any
  ) => {
    debugCore.log(level, message, context);
  };

  const clearLogs = () => {
    debugCore.clearLogs();
    setLogs([]);
  };

  return {
    logs,
    logMessage,
    clearLogs,
    errorLogs: logs.filter(log => log.level === 'error'),
    warningLogs: logs.filter(log => log.level === 'warn'),
    infoLogs: logs.filter(log => log.level === 'info'),
    debugLogs: logs.filter(log => log.level === 'debug')
  };
}