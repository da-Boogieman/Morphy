import React, { useState, useEffect } from 'react';
import { InternalComputer } from '../../services/compute/InternalComputer';
import { DevelopmentConsole } from '../admin/DevelopmentConsole';
import { SystemDashboard } from './SystemDashboard';
import { QuantumVisualizer } from '../quantum/QuantumVisualizer';
import { PersistenceCore } from '../../services/core/persistence/PersistenceCore';

export function ComputerInterface() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState<'develop' | 'monitor' | 'quantum'>('develop');
  const computer = InternalComputer.getInstance();
  const persistence = PersistenceCore.getInstance();

  useEffect(() => {
    const initialize = async () => {
      await computer.initialize();
      await persistence.initialize();
      setIsInitialized(true);
    };
    initialize();
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-xl text-white">
          <div className="mb-4">Initializing Quantum Computer...</div>
          <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-blue-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 mb-6">
        <div className="container mx-auto px-6">
          <div className="flex space-x-4">
            <TabButton 
              active={activeTab === 'develop'} 
              onClick={() => setActiveTab('develop')}
            >
              Development
            </TabButton>
            <TabButton 
              active={activeTab === 'monitor'} 
              onClick={() => setActiveTab('monitor')}
            >
              System Monitor
            </TabButton>
            <TabButton 
              active={activeTab === 'quantum'} 
              onClick={() => setActiveTab('quantum')}
            >
              Quantum State
            </TabButton>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8">
            {activeTab === 'develop' && <DevelopmentConsole />}
            {activeTab === 'monitor' && <SystemDashboard />}
            {activeTab === 'quantum' && <QuantumVisualizer />}
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* Quick Actions */}
            <QuickActions />
            
            {/* System Metrics */}
            <SystemMetrics />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function TabButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 font-medium transition-colors ${
        active 
          ? 'text-blue-400 border-b-2 border-blue-400' 
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

function QuickActions() {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-2">
        <ActionButton onClick={() => persistence.createSystemBackup()}>
          Create Backup
        </ActionButton>
        <ActionButton onClick={() => persistence.getCurrentState()}>
          Save State
        </ActionButton>
      </div>
    </div>
  );
}

function ActionButton({ 
  children, 
  onClick 
}: { 
  children: React.ReactNode; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
    >
      {children}
    </button>
  );
}

function SystemMetrics() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      const computer = InternalComputer.getInstance();
      // Fetch and update metrics
    };
    fetchMetrics();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">System Metrics</h3>
      {metrics && (
        <div className="space-y-2">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-400">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}