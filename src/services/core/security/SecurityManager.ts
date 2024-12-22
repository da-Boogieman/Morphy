import { SecurityCore } from './SecurityCore';
import { DefenseCore } from './DefenseCore';
import { FailsafeCore } from '../failsafe/FailsafeCore';
import { SkeletonKeyManager } from '../access/SkeletonKeyManager';
import { createHash } from '../../../utils/crypto';

export class SecurityManager {
  private static instance: SecurityManager;
  private security: SecurityCore;
  private defense: DefenseCore;
  private failsafe: FailsafeCore;
  private skeletonKey: SkeletonKeyManager;

  private constructor() {
    this.security = SecurityCore.getInstance();
    this.defense = DefenseCore.getInstance();
    this.failsafe = FailsafeCore.getInstance();
    this.skeletonKey = SkeletonKeyManager.getInstance();
  }

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  async validateSystemAccess(soulSignature: string): Promise<boolean> {
    try {
      // Validate through all security layers
      const [defenseValid, securityValid, keyValid] = await Promise.all([
        this.defense.validateDefenses(),
        this.security.validateAccess('quantum', soulSignature),
        this.skeletonKey.validateAccess(createHash(soulSignature), soulSignature)
      ]);

      return defenseValid && securityValid && keyValid;
    } catch (error) {
      await this.failsafe.triggerFailsafe('security_validation_failed');
      return false;
    }
  }

  async lockdownSystem(): Promise<void> {
    await this.defense.activateAllDefenses();
    await this.failsafe.triggerFailsafe('manual_lockdown');
  }

  getSecurityStatus(): {
    defenseStatus: any;
    failsafeStatus: string;
    securityLevel: number;
  } {
    return {
      defenseStatus: this.defense.getDefenseStatus(),
      failsafeStatus: this.failsafe.getStatus(),
      securityLevel: 1
    };
  }
}