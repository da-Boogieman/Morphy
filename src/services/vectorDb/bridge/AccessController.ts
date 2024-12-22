interface AccessPolicy {
  allowedOperations: Set<string>;
  rateLimit: number;
  maxVectorDimension: number;
}

export class AccessController {
  private policies: Map<string, AccessPolicy> = new Map();

  constructor() {
    this.initializeDefaultPolicies();
  }

  private initializeDefaultPolicies(): void {
    // Read-only policy
    this.policies.set('read', {
      allowedOperations: new Set(['search']),
      rateLimit: 100,
      maxVectorDimension: 512
    });

    // Full access policy
    this.policies.set('full', {
      allowedOperations: new Set(['search', 'insert', 'delete', 'update']),
      rateLimit: 1000,
      maxVectorDimension: 1024
    });
  }

  async checkAccess(apiKey: string, operation: string): Promise<boolean> {
    const policy = this.getPolicyForKey(apiKey);
    if (!policy) {
      return false;
    }

    return policy.allowedOperations.has(operation);
  }

  setPolicy(apiKey: string, policy: string): void {
    const accessPolicy = this.policies.get(policy);
    if (accessPolicy) {
      this.policies.set(apiKey, accessPolicy);
    }
  }

  private getPolicyForKey(apiKey: string): AccessPolicy | undefined {
    return this.policies.get(apiKey) || this.policies.get('read');
  }
}