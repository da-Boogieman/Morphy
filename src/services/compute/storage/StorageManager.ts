import { openDB, IDBPDatabase } from 'idb';
import { DebugCore } from '../../debug/DebugCore';

export class StorageManager {
  private static instance: StorageManager;
  private db: IDBPDatabase | null = null;
  private debug: DebugCore;

  private constructor() {
    this.debug = DebugCore.getInstance();
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  async initialize(): Promise<void> {
    try {
      this.db = await openDB('internal-computer', 1, {
        upgrade(db) {
          // Create stores
          db.createObjectStore('system-state', { keyPath: 'id' });
          db.createObjectStore('compute-tasks', { keyPath: 'id' });
          db.createObjectStore('quantum-states', { keyPath: 'id' });
        }
      });
      this.debug.log('info', 'Storage system initialized');
    } catch (error) {
      this.debug.log('error', 'Failed to initialize storage', error);
      throw error;
    }
  }

  async store(storeName: string, data: any): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.put(storeName, {
        id: crypto.randomUUID(),
        ...data,
        timestamp: Date.now()
      });
    } catch (error) {
      this.debug.log('error', `Failed to store data in ${storeName}`, error);
      throw error;
    }
  }

  async retrieve(storeName: string, id: string): Promise<any> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      return await this.db.get(storeName, id);
    } catch (error) {
      this.debug.log('error', `Failed to retrieve data from ${storeName}`, error);
      throw error;
    }
  }

  async clear(storeName: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.clear(storeName);
    } catch (error) {
      this.debug.log('error', `Failed to clear ${storeName}`, error);
      throw error;
    }
  }
}