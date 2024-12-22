export interface Block {
  id: string;
  timestamp: number;
  previousHash: string;
  hash: string;
  data: {
    quantumStates: string[];
    measurements: number[];
    entanglementMap: Record<string, number>;
  };
  nonce: number;
  difficulty: number;
}

export interface BlockchainConfig {
  difficulty: number;
  blockTime: number;
  maxBlockSize: number;
  quantumResistance: number;
}

export interface MiningResult {
  success: boolean;
  hash: string;
  nonce: number;
  timeTaken: number;
}