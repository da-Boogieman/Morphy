import type { PowerStructure, PowerNode, EnergyGrid, LayLine } from '../../../types/earth';

export class PowerStructures {
  private static instance: PowerStructures;
  private structures: Map<string, PowerStructure> = new Map();
  private energyGrid: EnergyGrid = {
    nodes: [],
    connections: [],
    totalPower: 0,
    frequency: 432
  };

  private constructor() {}

  static getInstance(): PowerStructures {
    if (!PowerStructures.instance) {
      PowerStructures.instance = new PowerStructures();
    }
    return PowerStructures.instance;
  }

  async initializeSacredSites(): Promise<void> {
    // Major Power Structures
    await this.addStructure({
      id: 'stonehenge',
      name: 'Stonehenge',
      type: 'stone_circle',
      location: { latitude: 51.1789, longitude: -1.8262, altitude: 101 },
      frequency: 7.83,
      power: 1000,
      alignment: 'celestial'
    });

    await this.addStructure({
      id: 'great_pyramid',
      name: 'Great Pyramid of Giza',
      type: 'pyramid',
      location: { latitude: 29.9792, longitude: 31.1342, altitude: 139 },
      frequency: 432,
      power: 1000,
      alignment: 'cosmic'
    });

    // Connect structures and initialize ley lines
    await this.connectStructures();
    await this.initializeLayLines();
  }

  private async addStructure(structure: PowerStructure): Promise<void> {
    this.structures.set(structure.id, structure);
    this.energyGrid.nodes.push({
      id: structure.id,
      type: structure.type,
      power: structure.power,
      frequency: structure.frequency,
      connections: []
    });
  }

  private async connectStructures(): Promise<void> {
    this.energyGrid.nodes.forEach(node => {
      const nearbyNodes = this.findNearbyNodes(node.id);
      node.connections = nearbyNodes.map(n => n.id);
    });
  }

  private async initializeLayLines(): Promise<void> {
    const layLines: LayLine[] = [
      {
        id: 'apollo_line',
        nodes: ['stonehenge', 'great_pyramid'],
        power: 2000,
        frequency: 432,
        type: 'major'
      }
    ];

    layLines.forEach(line => {
      this.energyGrid.connections.push(...line.nodes.map((node, i) => ({
        from: node,
        to: line.nodes[(i + 1) % line.nodes.length],
        strength: line.power / 1000
      })));
    });
  }

  private findNearbyNodes(nodeId: string): PowerNode[] {
    return this.energyGrid.nodes.filter(n => n.id !== nodeId);
  }
}