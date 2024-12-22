import { EventEmitter } from 'events';
import { InternalComputer } from './InternalComputer';
import { VectorServer } from '../vectorDb/server/VectorServer';
import { SecurityGateway } from '../vectorDb/bridge/SecurityGateway';
import { DebugCore } from '../debug/DebugCore';

export class InternalComputerServer {
  private static instance: InternalComputerServer;
  private computer: InternalComputer;
  private vectorServer: VectorServer;
  private security: SecurityGateway;
  private debug: DebugCore;
  private emitter: EventEmitter;
  private isRunning: boolean = false;

  private constructor() {
    this.computer = InternalComputer.getInstance();
    this.vectorServer = VectorServer.getInstance();
    this.security = SecurityGateway.getInstance();
    this.debug = DebugCore.getInstance();
    this.emitter = new EventEmitter();
    this.setupEventHandlers();
  }

  static getInstance(): InternalComputerServer {
    if (!InternalComputerServer.instance) {
      InternalComputerServer.instance = new InternalComputerServer();
    }
    return InternalComputerServer.instance;
  }

  private setupEventHandlers(): void {
    this.emitter.on('error', this.handleError.bind(this));
    this.emitter.on('request', this.handleRequest.bind(this));
  }

  async start(): Promise<void> {
    if (this.isRunning) return;

    try {
      await this.computer.initialize();
      await this.vectorServer.start();
      this.isRunning = true;
      this.debug.log('info', 'Internal computer server started');
    } catch (error) {
      this.handleError(error);
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) return;

    try {
      await this.vectorServer.stop();
      this.isRunning = false;
      this.debug.log('info', 'Internal computer server stopped');
    } catch (error) {
      this.handleError(error);
    }
  }

  private async handleRequest(request: any): Promise<void> {
    try {
      // Validate request through security gateway
      await this.security.validateRequest(request, request.apiKey);

      // Process request through internal computer
      const result = await this.computer.processRequest(request);

      this.emitter.emit('response', {
        success: true,
        data: result,
        timestamp: Date.now()
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    this.debug.log('error', error instanceof Error ? error.message : String(error));
    this.emitter.emit('error', error);
  }

  getStatus(): {
    isRunning: boolean;
    computerStatus: any;
    serverStatus: any;
  } {
    return {
      isRunning: this.isRunning,
      computerStatus: this.computer.getStatus(),
      serverStatus: this.vectorServer.getStatus()
    };
  }
}