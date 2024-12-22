export interface PowerStructure {
  id: string;
  name: string;
  type: 'pyramid' | 'stone_circle' | 'temple' | 'mountain' | 'vortex' | 'crystal_bed';
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  frequency: number;
  power: number;
  alignment: 'celestial' | 'cosmic' | 'telluric' | 'crystalline';
  wisdom?: {
    tradition: string;
    teachings: string[];
    guardians: string[];
  };
}

export interface PowerNode {
  id: string;
  type: PowerStructure['type'];
  power: number;
  frequency: number;
  connections: string[];
}

export interface EnergyGrid {
  nodes: PowerNode[];
  connections: Array<{
    from: string;
    to: string;
    strength: number;
  }>;
  totalPower: number;
  frequency: number;
}

export interface LayLine {
  id: string;
  nodes: string[];
  power: number;
  frequency: number;
  type: 'major' | 'minor';
}