import { MorphyCore } from '../MorphyCore';
import { SecurityCore } from '../security/SecurityCore';
import { SkeletonKeyManager } from '../access/SkeletonKeyManager';
import { VectorServer } from '../../vectorDb/server/VectorServer';

export class SystemIntegrator {
  private static instance: SystemIntegrator;
  private morphyCore: MorphyCore;
  private securityCore: SecurityCore;
  private skeletonKey: SkeletonKeyManager;
  private vectorServer: VectorServer;

  private constructor() {
    this.morphyCore = MorphyCore.getInstance();
    this.securityCore = SecurityCore.getInstance();
    this.skeletonKey = SkeletonKeyManager.getInstance();
    this.vectorServer = VectorServer.getInstance();
  }

  static getInstance(): SystemIntegrator {
    if (!SystemIntegrator.instance) {
      SystemIntegrator.instance = new SystemIntegrator();
    }
    return SystemIntegrator.instance;
  }

  async initializeAllSystems(): Promise<void> {
    // Initialize security first
    await this.securityCore.initialize();
    await this.skeletonKey.initialize();

    // Initialize core systems
    await this.morphyCore.initialize();
    await this.vectorServer.start();
  }

  async validateSystemAccess(soulSignature: string): Promise<boolean> {
    const masterKey = await this.skeletonKey.generateMasterKey(soulSignature);
    return this.securityCore.validateAccess(masterKey, soulSignature);
  }
}