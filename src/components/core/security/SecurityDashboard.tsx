import React from 'react';
import { useSecurityManager } from '../../../hooks/useSecurityManager';
import { useDefense } from '../../../hooks/useDefense';
import { useFailsafe } from '../../../hooks/useFailsafe';

export function SecurityDashboard() {
  const { securityStatus, error: securityError, lockdown } = useSecurityManager();
  const { defenseStatus } = useDefense();
  const { isEmergencyMode, systemStatus } = useFailsafe();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Security Dashboard</h2>
        <button
          onClick={lockdown}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Emergency Lockdown
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Defense Status */}
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Defense Systems</h3>
          {defenseStatus && (
            <div className="space-y-2">
              <p>Active Defenses: {defenseStatus.activeDefenses}</p>
              <p>Total Strength: {(defenseStatus.totalStrength * 100).toFixed(1)}%</p>
              <p>Integrity: {(defenseStatus.integrityLevel * 100).toFixed(1)}%</p>
            </div>
          )}
        </div>

        {/* System Status */}
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">System Status</h3>
          <div className="space-y-2">
            <p>Emergency Mode: {isEmergencyMode ? 'Active' : 'Inactive'}</p>
            <p>Status: {systemStatus}</p>
            <p>Security Level: {securityStatus?.securityLevel || 0}</p>
          </div>
        </div>
      </div>

      {securityError && (
        <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
          <p className="text-red-400">{securityError}</p>
        </div>
      )}
    </div>
  );
}