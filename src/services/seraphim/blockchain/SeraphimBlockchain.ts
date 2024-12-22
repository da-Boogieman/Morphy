import { BlockchainService } from '../../blockchain/BlockchainService';
import type { Block, SeraphimToken } from '../../../types/seraphim';

export class SeraphimBlockchain {
  private static instance: SeraphimBlockchain;
  private blockchain: BlockchainService;
  private blocks: Block[] = [];
  private mempool: Map<string, SeraphimToken> = new Map();

  private constructor() {
    this.blockchain = new BlockchainService({
      difficulty: 4,
      blockTime: 60000,
      maxBlockSize: 1000000,
      quantumResistance: 0.95
    });
    this.initializeGenesisBlock();
  }

  static getInstance(): SeraphimBlockchain {
    if (!SeraphimBlockchain.instance) {
      SeraphimBlockchain.instance = new SeraphimBlockchain();
    }
    return SeraphimBlockchain.instance;
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
      difficulty: 4
    };

    genesisBlock.hash = await this.calculateBlockHash(genesisBlock);
    this.blocks.push(genesisBlock);
  }

  async addToken(token: SeraphimToken): Promise<void> {
    this.mempool.set(token.id, token);
    
    if (this.mempool.size >= 10) { // Create block when mempool reaches threshold
      await this.createNewBlock();
    }
  }

  private async createNewBlock(): Promise<void> {
    const previousBlock = this.blocks[this.blocks.length - 1];
    const tokens = Array.from(this.mempool.values());
    
    const newBlock: Block = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      previousHash: previousBlock.hash,
      hash: '',
      data: {
        quantumStates: tokens.map(t => t.intentionSignature),
        measurements: tokens.map(t => t.amount),
        entanglementMap: {}
      },
      nonce: 0,
      difficulty: previousBlock.difficulty
    };

    const minedBlock = await this.mineBlock(newBlock);
    this.blocks.push(minedBlock);
    this.mempool.clear();
  }

  private async mineBlock(block: Block): Promise<Block> {
    let nonce = 0;
    let hash = '';
    
    while (true) {
      block.nonce = nonce;
      hash = await this.calculateBlockHash(block);
      
      if (hash.startsWith('0'.repeat(block.difficulty))) {
        break;
      }
      
      nonce++;
    }

    block.hash = hash;
    return block;
  }

  private async calculateBlockHash(block: Block): Promise<string> {
    const data = JSON.stringify({
      id: block.id,
      timestamp: block.timestamp,
      previousHash: block.previousHash,
      data: block.data,
      nonce: block.nonce
    });

    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(data)
    );

    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  getBlocks(): Block[] {
    return [...this.blocks];
  }

  validateChain(): boolean {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}