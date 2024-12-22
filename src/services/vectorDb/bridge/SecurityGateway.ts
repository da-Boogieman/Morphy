import { createHash, randomBytes } from 'crypto';
import { ServerRequest } from '../server/types';
import { RateLimiter } from './RateLimiter';
import { RequestValidator } from './RequestValidator';
import { AccessController } from './AccessController';

export class SecurityGateway {
  private static instance: SecurityGateway;
  private rateLimiter: RateLimiter;
  private validator: RequestValidator;
  private accessController: AccessController;
  private apiKeys: Map<string, string> = new Map();

  private constructor() {
    this.rateLimiter = new RateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100
    });
    this.validator = new RequestValidator();
    this.accessController = new AccessController();
  }

  static getInstance(): SecurityGateway {
    if (!SecurityGateway.instance) {
      SecurityGateway.instance = new SecurityGateway();
    }
    return SecurityGateway.instance;
  }

  async validateRequest(request: ServerRequest, apiKey: string): Promise<boolean> {
    try {
      // Check API key
      if (!this.verifyApiKey(apiKey)) {
        throw new Error('Invalid API key');
      }

      // Check rate limit
      if (!await this.rateLimiter.checkLimit(apiKey)) {
        throw new Error('Rate limit exceeded');
      }

      // Validate request format and content
      if (!await this.validator.validateRequest(request)) {
        throw new Error('Invalid request format');
      }

      // Check access permissions
      if (!await this.accessController.checkAccess(apiKey, request.type)) {
        throw new Error('Insufficient permissions');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  generateApiKey(clientId: string): string {
    const key = randomBytes(32).toString('hex');
    const hash = this.hashApiKey(key);
    this.apiKeys.set(clientId, hash);
    return key;
  }

  private verifyApiKey(apiKey: string): boolean {
    const hash = this.hashApiKey(apiKey);
    return Array.from(this.apiKeys.values()).includes(hash);
  }

  private hashApiKey(key: string): string {
    return createHash('sha256').update(key).digest('hex');
  }
}