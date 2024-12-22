import { SecurityGateway } from './SecurityGateway';
import { VectorServer } from '../server/VectorServer';
import { ServerRequest, ServerMetrics } from '../server/types';
import { DebugCore } from '../../debug/DebugCore';

export class BridgeServer {
  private static instance: BridgeServer;
  private security: SecurityGateway;
  private vectorServer: VectorServer;
  private debug: DebugCore;

  private constructor() {
    this.security = SecurityGateway.getInstance();
    this.vectorServer = VectorServer.getInstance();
    this.debug = DebugCore.getInstance();
  }

  static getInstance(): BridgeServer {
    if (!BridgeServer.instance) {
      BridgeServer.instance = new BridgeServer();
    }
    return BridgeServer.instance;
  }

  async handleRequest(request: ServerRequest, apiKey: string): Promise<any> {
    try {
      // Validate request through security gateway
      await this.security.validateRequest(request, apiKey);

      // Log request
      this.debug.log('info', `Processing ${request.type} request`, {
        collection: request.collection,
        timestamp: request.timestamp
      });

      // Forward to vector server
      const response = await this.vectorServer.handleRequest(request);

      return {
        success: true,
        data: response,
        timestamp: Date.now()
      };
    } catch (error) {
      this.debug.log('error', 'Request failed', {
        error: error instanceof Error ? error.message : String(error),
        request
      });

      throw error;
    }
  }

  async generateApiKey(clientId: string): Promise<string> {
    return this.security.generateApiKey(clientId);
  }

  getMetrics(): ServerMetrics {
    return this.vectorServer.getMetrics();
  }
}