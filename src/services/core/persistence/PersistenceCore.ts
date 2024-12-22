import { openDB } from 'idb';
import type { DevelopmentState, CodeSnapshot, SystemBackup } from './types';

export class PersistenceCore {
  private static instance: PersistenceCore;
  private db: any;

  private constructor() {}

  static getInstance(): PersistenceCore {
    if (!PersistenceCore.instance) {
      PersistenceCore.instance = new PersistenceCore();
    }
    return PersistenceCore.instance;
  }

  async initialize(): Promise<void> {
    this.db = await openDB('morphy-development', 1, {
      upgrade(db) {
        // Store development state
        db.createObjectStore('development-state', { keyPath: 'id' });
        // Store code snapshots
        db.createObjectStore('code-snapshots', { keyPath: 'id' });
        // Store system backups
        db.createObjectStore('system-backups', { keyPath: 'id' });
      }
    });
  }

  async saveDevelopmentState(state: DevelopmentState): Promise<void> {
    await this.db.put('development-state', {
      id: 'current',
      ...state,
      timestamp: Date.now()
    });
  }

  async saveCodeSnapshot(snapshot: CodeSnapshot): Promise<void> {
    await this.db.put('code-snapshots', {
      id: crypto.randomUUID(),
      ...snapshot,
      timestamp: Date.now()
    });
  }

  async createSystemBackup(): Promise<void> {
    const backup: SystemBackup = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      state: await this.getCurrentState(),
      snapshots: await this.getAllSnapshots()
    };

    await this.db.put('system-backups', backup);
  }

  async getCurrentState(): Promise<DevelopmentState | null> {
    return this.db.get('development-state', 'current');
  }

  async getAllSnapshots(): Promise<CodeSnapshot[]> {
    return this.db.getAll('code-snapshots');
  }

  async restoreFromBackup(backupId: string): Promise<void> {
    const backup = await this.db.get('system-backups', backupId);
    if (backup) {
      await this.saveDevelopmentState(backup.state);
      for (const snapshot of backup.snapshots) {
        await this.saveCodeSnapshot(snapshot);
      }
    }
  }
}