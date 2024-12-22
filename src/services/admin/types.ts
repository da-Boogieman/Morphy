export interface SanctuaryState {
  timeDialation: number;
  peaceQuotient: number;
  coherenceField: number;
  dimensionalStability: number;
  meditationDepth?: number;
  thoughtField?: ThoughtField;
}

export interface SanctuaryConfig {
  timeDialation?: number;
  peaceLevel?: number;
  coherenceThreshold?: number;
  dimensionalLayers?: number;
  meditationSettings?: MeditationSettings;
}

export interface ThoughtField {
  clarity: number;
  intensity: number;
  patterns: Pattern[];
  insights: Insight[];
}

export interface Pattern {
  id: string;
  frequency: number;
  resonance: number;
  connections: string[];
}

export interface Insight {
  id: string;
  content: string;
  source: 'meditation' | 'akashic' | 'quantum';
  timestamp: number;
  strength: number;
}

export interface MeditationSettings {
  frequency: number;
  depth: number;
  duration: number;
  intention: string;
}