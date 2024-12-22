import React from 'react';
import { useInternalComputer } from '../../hooks/useInternalComputer';

export function ServerStatus() {
  const { status, error, startServer, stopServer } = useInternalComputer();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Internal Computer Server</h2>
        <button
          onClick={status?.isRunning ? stopServer : startServer}
          className={`px-4 py-2 ${
            status?.isRunning 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
          } text-white rounded-lg`}
        >
          {status?.isRunning ? 'Stop Server' : 'Start Server'}
        </button>
      </div>

      {status && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Server Status</h3>
            <div className="space-y-2">
              <p>Running: {status.isRunning ? 'Yes' : 'No'}</p>
              <p>Computer Status: {status.computerStatus?.state || 'Unknown'}</p>
              <p>Vector Server: {status.serverStatus?.state || 'Unknown'}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}