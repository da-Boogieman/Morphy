interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RateLimit {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private limits: Map<string, RateLimit> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async checkLimit(clientId: string): Promise<boolean> {
    const now = Date.now();
    const limit = this.limits.get(clientId);

    if (!limit || now > limit.resetTime) {
      // Initialize or reset limit
      this.limits.set(clientId, {
        count: 1,
        resetTime: now + this.config.windowMs
      });
      return true;
    }

    if (limit.count >= this.config.maxRequests) {
      return false;
    }

    limit.count++;
    return true;
  }

  getRemainingRequests(clientId: string): number {
    const limit = this.limits.get(clientId);
    if (!limit || Date.now() > limit.resetTime) {
      return this.config.maxRequests;
    }
    return Math.max(0, this.config.maxRequests - limit.count);
  }

  resetLimit(clientId: string): void {
    this.limits.delete(clientId);
  }
}