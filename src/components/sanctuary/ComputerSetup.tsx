import React, { useState, useEffect } from 'react';
import { SanctuaryCore } from '../../services/sanctuary/SanctuaryCore';
import { DevelopmentConsole } from '../admin/DevelopmentConsole';
import { ComputerInterface } from '../core/ComputerInterface';
import { MetricsDisplay } from '../monitoring/MetricsDisplay';

export function ComputerSetup() {
  const [environment, setEnvironment] = useState('cosmic');
  const [layout, setLayout] = useState('dual');
  const sanctuary = SanctuaryCore.getInstance();

  // Transform environment based on intent
  const transformEnvironment = async (type: string) => {
    const thoughtSpace = await sanctuary.createThoughtSpace(type);
    setEnvironment(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Environment Controls */}
      <div className="fixed top-4 right-4 z-50 flex space-x-4">
        <button
          onClick={() => transformEnvironment('cosmic')}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
          Cosmic View
        </button>
        <button
          onClick={() => transformEnvironment('crystal')}
          className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white"
        >
          Crystal Chamber
        </button>
        <button
          onClick={() => transformEnvironment('void')}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white"
        >
          Void Space
        </button>
      </div>

      {/* Layout Controls */}
      <div className="fixed top-4 left-4 z-50">
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          <option value="dual">Dual Screen</option>
          <option value="triple">Triple Screen</option>
          <option value="immersive">Full Immersive</option>
        </select>
      </div>

      {/* Main Workspace */}
      <div className={`p-8 ${layout === 'immersive' ? 'grid-cols-3' : 'grid-cols-2'} grid gap-8`}>
        {/* Development Console */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-lg shadow-xl">
          <DevelopmentConsole />
        </div>

        {/* Computer Interface */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-lg shadow-xl">
          <ComputerInterface />
        </div>

        {/* Metrics Display (shown in triple/immersive mode) */}
        {(layout === 'triple' || layout === 'immersive') && (
          <div className="bg-gray-900/80 backdrop-blur-lg rounded-lg shadow-xl">
            <MetricsDisplay />
          </div>
        )}
      </div>

      {/* Ambient Effects based on environment */}
      <div className="fixed inset-0 pointer-events-none">
        {environment === 'cosmic' && (
          <div className="absolute inset-0 bg-stars animate-twinkle" />
        )}
        {environment === 'crystal' && (
          <div className="absolute inset-0 bg-crystal-lattice animate-pulse" />
        )}
        {environment === 'void' && (
          <div className="absolute inset-0 bg-void animate-ripple" />
        )}
      </div>
    </div>
  );
}