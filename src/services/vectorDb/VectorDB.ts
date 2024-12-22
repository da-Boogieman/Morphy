import { openDB, IDBPDatabase } from 'idb';
import { Vector, Collection, SearchResult, DBConfig } from '../../types/vector';
import { calculateDistance, normalizeVector } from './utils';

export class VectorDB {
  private db: IDBPDatabase | null = null;
  private config: Required<DBConfig> = {
    maxCollectionSize: 1000000,
    similarityThreshold: 0.8,
    maxSearchResults: 100
  };

  constructor(config?: Partial<DBConfig>) {
    this.config = { ...this.config, ...config };
  }

  async initialize(): Promise<void> {
    this.db = await openDB('vector-store', 1, {
      upgrade(db) {
        db.createObjectStore('vectors', { keyPath: 'id' });
        db.createObjectStore('collections', { keyPath: 'id' });
      },
    });
  }

  async createCollection(collection: Omit<Collection, 'id'>): Promise<Collection> {
    if (!this.db) throw new Error('Database not initialized');
    
    const id = crypto.randomUUID();
    const newCollection: Collection = { ...collection, id };
    
    await this.db.put('collections', newCollection);
    return newCollection;
  }

  async addVector(collectionId: string, vector: Omit<Vector, 'id' | 'timestamp'>): Promise<Vector> {
    if (!this.db) throw new Error('Database not initialized');

    const collection = await this.db.get('collections', collectionId);
    if (!collection) throw new Error('Collection not found');

    const normalized = normalizeVector(vector.values);
    const newVector: Vector = {
      id: crypto.randomUUID(),
      values: normalized,
      metadata: vector.metadata,
      timestamp: Date.now()
    };

    await this.db.put('vectors', newVector);
    return newVector;
  }

  async search(collectionId: string, query: number[], limit = 10): Promise<SearchResult[]> {
    if (!this.db) throw new Error('Database not initialized');

    const collection = await this.db.get('collections', collectionId);
    if (!collection) throw new Error('Collection not found');

    const normalized = normalizeVector(query);
    const vectors = await this.db.getAll('vectors');
    
    return vectors
      .map(vector => ({
        vector,
        score: calculateDistance(normalized, vector.values),
        path: [collection.id]
      }))
      .filter(result => result.score >= this.config.similarityThreshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}