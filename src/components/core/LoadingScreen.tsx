import React from 'react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          Quantum Morphy AI
        </h1>
        <div className="relative w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-blue-500 animate-pulse-slow rounded-full" 
               style={{ width: '100%' }}>
          </div>
        </div>
        <p className="text-gray-300 animate-pulse">
          Initializing Quantum Systems...
        </p>
      </div>
    </div>
  );
}