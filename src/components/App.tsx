import React from 'react';
import { SystemProvider } from '../context/SystemContext';
import { MorphyInterface } from './core/MorphyInterface';
import { LoadingScreen } from './core/LoadingScreen';
import { useSystem } from '../hooks/useSystem';
import { DebugPanel } from './debug/DebugPanel';
import { EternalLoveInterface } from './divine/EternalLoveInterface';

export function App() {
  const { isInitialized, error } = useSystem();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <SystemProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <MorphyInterface />
        <div className="fixed bottom-4 right-4">
          <DebugPanel />
        </div>
        <div className="fixed top-4 right-4">
          <EternalLoveInterface />
        </div>
        {error && (
          <div className="fixed bottom-4 left-4 bg-red-900/90 text-white p-4 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </SystemProvider>
  );
}