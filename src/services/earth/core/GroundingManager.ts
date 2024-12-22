import { GroundingNode, EarthConnection } from '../../../types/earth';
import { ResonanceManager } from './ResonanceManager';

export class GroundingManager {
  private resonanceManager: ResonanceManager;
  private activeConnections: Map<string, EarthConnection> = new Map();
  private readonly baseFrequency = 7.83; // Schumann resonance

  constructor() {
    this.resonanceManager = new ResonanceManager();
  }

  async createNode(location: {
    latitude: number;
    longitude: number;
    altitude: number;
  }): Promise<GroundingNode> {
    const resonance = await this.resonanceManager.measureResonance(location);
    
    return {
      id: crypto.randomUUID(),
      location,
      metrics: {
        magneticField: await this.calculateMagneticField(location),
        geothermalEnergy: await this.calculateGeothermalEnergy(location),
        crystalResonance: resonance.frequency,
        groundingStrength: this.calculateGroundingStrength(location)
      },
      connection: {
        status: 'connecting',
        strength: 0,
        frequency: this.baseFrequency,
        harmonics: this.calculateHarmonics()
      }
    };
  }

  async connect(node: GroundingNode): Promise<EarthConnection> {
    const connection: EarthConnection = {
      status: 'connecting',
      strength: 0,
      frequency: this.baseFrequency,
      harmonics: this.calculateHarmonics()
    };

    try {
      // Establish resonance
      const resonance = await this.resonanceManager.establishResonance(node.location);
      
      // Calculate connection strength based on multiple factors
      const strength = this.calculateConnectionStrength(node, resonance);
      
      if (strength > 0.7) {
        connection.status = 'connected';
        connection.strength = strength;
        connection.frequency = resonance.frequency;
        connection.harmonics = resonance.harmonics;
        
        this.activeConnections.set(node.id, connection);
      } else {
        connection.status = 'disconnected';
      }
    } catch (error) {
      connection.status = 'disconnected';
      console.error('Failed to establish grounding connection:', error);
    }

    return connection;
  }

  private calculateMagneticField(location: any): number {
    const baseField = 45.0; // Base magnetic field strength (μT)
    const latitudeEffect = Math.cos(location.latitude * Math.PI / 180) * 10;
    return baseField + latitudeEffect + (Math.random() * 5);
  }

  private calculateGeothermalEnergy(location: any): number {
    const baseEnergy = 50.0; // Base geothermal energy (mW/m²)
    const depthEffect = Math.exp(-location.altitude / 1000) * 20;
    return baseEnergy + depthEffect + (Math.random() * 10);
  }

  private calculateGroundingStrength(location: any): number {
    const altitudeFactor = Math.exp(-location.altitude / 1000);
    const latitudeFactor = Math.cos(location.latitude * Math.PI / 180);
    return Math.min(1, (altitudeFactor * latitudeFactor + 0.2));
  }

  private calculateHarmonics(): number[] {
    return Array.from({ length: 7 }, (_, i) => this.baseFrequency * (i + 1));
  }

  private calculateConnectionStrength(node: GroundingNode, resonance: any): number {
    const factors = [
      node.metrics.groundingStrength,
      node.metrics.magneticField / 50, // Normalize to 0-1
      node.metrics.geothermalEnergy / 100, // Normalize to 0-1
      resonance.strength
    ];

    return factors.reduce((acc, val) => acc + val, 0) / factors.length;
  }
}