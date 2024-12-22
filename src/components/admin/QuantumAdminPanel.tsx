import React from 'react';
import { AdminControls } from './controls/AdminControls';
import { QuantumVisualizer } from '../quantum/QuantumVisualizer';
import { MetricsDisplay } from '../monitoring/MetricsDisplay';
import { SystemStatus } from '../core/interface/SystemStatus';

export function QuantumAdminPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Main Controls */}
      <div className="space-y-6">
        <AdminControls />
        <SystemStatus />
      </div>

      {/* Visualization & Metrics */}
      <div className="space-y-6">
        <div className="bg-black/30 rounded-lg p-4 h-[300px] relative overflow-hidden">
          <QuantumVisualizer />
        </div>
        <MetricsDisplay />
      </div>
    </div>
  );
}