import React from 'react';
import { useDebug } from '../../hooks/useDebug';
import { useSystem } from '../../context/SystemContext';

export function DebugPanel() {
  const { logs, clearLogs } = useDebug();
  const { systemState } = useSystem();

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-900/95 text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Debug Console</h3>
        <button
          onClick={clearLogs}
          className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
        >
          Clear
        </button>
      </div>

      <div className="h-48 overflow-y-auto space-y-2">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`text-sm ${
              log.level === 'error'
                ? 'text-red-400'
                : log.level === 'warn'
                ? 'text-yellow-400'
                : 'text-blue-400'
            }`}
          >
            <span className="opacity-75">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            <span className="mx-2">[{log.level.toUpperCase()}]</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>

      {systemState && (
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="text-sm">
            <div>Coherence: {(systemState.coherence * 100).toFixed(1)}%</div>
            <div>Stability: {(systemState.stability * 100).toFixed(1)}%</div>
            <div>Energy: {(systemState.energyEfficiency * 100).toFixed(1)}%</div>
          </div>
        </div>
      )}
    </div>
  );
}