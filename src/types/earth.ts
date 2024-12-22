export interface EarthMetrics {
  magneticField: number;
  geothermalEnergy: number;
  crystalResonance: number;
  groundingStrength: number;
}

export interface LayerData {
  depth: number;
  composition: string;
  energyDensity: number;
  resonanceFrequency: number;
}

export interface EarthConnection {
  status: 'connected' | 'connecting' | 'disconnected';
  strength: number;
  frequency: number;
  harmonics: number[];
}

export interface GroundingNode {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  metrics: EarthMetrics;
  connection: EarthConnection;
}