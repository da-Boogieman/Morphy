import { Block, BlockchainConfig, MiningResult } from '../../types/blockchain';
import { createHash } from 'crypto';

export class BlockchainService {
  private chain: Block[] = [];
  private config: BlockchainConfig;
  private mempool: Map<string, any> = new Map();

  constructor(config: BlockchainConfig) {
    this.config = config;
    this.initializeGenesisBlock();
  }

  private async initializeGenesisBlock(): Promise<void> {
    const genesisBlock: Block = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      previousHash: '0',
      hash: '',
      data: {
        quantumStates: [],
        measurements: [],
        entanglementMap: {}
      },
      nonce: 0,
      difficulty: this.config.difficulty
    };

    genesisBlock.hash = await this.calculateBlockHash(genesisBlock);
    this.chain.push(genesisBlock);
  }

  async addTransaction(transaction: any): Promise<void> {
    this.mempool.set(transaction.id, transaction);
    
    if (this.mempool.size >= 10) {
      await this.createNewBlock();
    }
  }

  private async calculateBlockHash(block: Block): Promise<string> {
    const data = JSON.stringify({
      id: block.id,
      timestamp: block.timestamp,
      previousHash: block.previousHash,
      data: block.data,
      nonce: block.nonce
    });

    return createHash('sha256')
      .update(data)
      .digest('hex');
  }
}