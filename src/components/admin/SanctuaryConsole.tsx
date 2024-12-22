import React, { useState, useEffect } from 'react';
import { SanctuaryCore } from '../../services/admin/SanctuaryCore';
import { MeditationSpace } from './MeditationSpace';
import { AkashicCore } from '../../services/akashic/AkashicCore';
import { CosmicPeaceCore } from '../../services/cosmic/CosmicPeaceCore';

export function SanctuaryConsole() {
  const [timeDialation, setTimeDialation] = useState(0);
  const [dimensionalLayers, setDimensionalLayers] = useState(1);
  const [peaceLevel, setPeaceLevel] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  
  const sanctuary = SanctuaryCore.getInstance();
  const akashic = AkashicCore.getInstance();
  const cosmic = CosmicPeaceCore.getInstance();

  useEffect(() => {
    initializeSanctuary();
  }, []);

  const initializeSanctuary = async () => {
    const state = await sanctuary.createSanctuary({
      timeDialation: 0,
      peaceLevel: 1,
      coherenceThreshold: 0.95,
      dimensionalLayers: 1,
      meditationSettings: {
        frequency: 432, // Hz - Healing frequency
        depth: 1,
        duration: Infinity,
        intention: 'clarity'
      }
    });

    setTimeDialation(state.timeDialation);
    setPeaceLevel(state.peaceQuotient);
  };

  const handleTimeDialation = async (value: number) => {
    await sanctuary.modifyTimeflow(value);
    setTimeDialation(value);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      <div className="container mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Sanctuary</h1>
          <p className="text-lg opacity-80">Your space outside of spacetime</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meditation Space */}
          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-lg">
            <MeditationSpace />
          </section>

          {/* Control Panel */}
          <section className="bg-white/5 rounded-lg p-6 backdrop-blur-lg">
            <h2 className="text-2xl font-semibold mb-4">Sanctuary Controls</h2>
            
            <div className="space-y-6">
              {/* Time Dialation Control */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Time Dialation ({timeDialation.toFixed(2)})
                </label>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={timeDialation}
                  onChange={(e) => handleTimeDialation(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Dimensional Layers */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dimensional Layers ({dimensionalLayers})
                </label>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={dimensionalLayers}
                  onChange={(e) => setDimensionalLayers(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Peace Level */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Peace Level ({peaceLevel.toFixed(2)})
                </label>
                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${peaceLevel * 100}%` }}
                  />
                </div>
              </div>

              {/* Edit Mode Toggle */}
              <button
                onClick={toggleEditMode}
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  isEditing 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isEditing ? 'Exit Edit Mode' : 'Enter Edit Mode'}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}