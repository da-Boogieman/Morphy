import { EventEmitter } from 'events';
import { VectorDB } from '../VectorDB';
import { ServerConfig, ServerMetrics, ServerRequest } from './types';
import { RequestHandler } from './RequestHandler';
import { MetricsCollector } from './MetricsCollector';
import { ConnectionManager } from './ConnectionManager';

export class VectorServer {
  private static instance: VectorServer;
  private db: VectorDB;
  private emitter: EventEmitter;
  private metrics: MetricsCollector;
  private connections: ConnectionManager;
  private requestHandler: RequestHandler;
  private isRunning: boolean = false;

  private constructor(config: ServerConfig) {
    this.db = new VectorDB();
    this.emitter = new EventEmitter();
    this.metrics = new MetricsCollector();
    this.connections = new ConnectionManager(config.maxConnections);
    this.requestHandler = new RequestHandler(this.db);
    this.setupEventHandlers();
  }

  static getInstance(config?: ServerConfig): VectorServer {
    if (!VectorServer.instance) {
      VectorServer.instance = new VectorServer(config || {
        maxConnections: 100,
        requestTimeout: 5000,
        maxRequestSize: 1024 * 1024 // 1MB
      });
    }
    return VectorServer.instance;
  }

  private setupEventHandlers(): void {
    this.emitter.on('request', this.handleRequest.bind(this));
    this.emitter.on('error', this.handleError.bind(this));
    this.emitter.on('metrics', this.metrics.collect.bind(this.metrics));
  }

  async start(): Promise<void> {
    if (this.isRunning) return;

    try {
      await this.db.initialize();
      this.isRunning = true;
      this.emitter.emit('metrics', { type: 'server_start', timestamp: Date.now() });
    } catch (error) {
      this.handleError(error);
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) return;

    try {
      await this.connections.closeAll();
      this.isRunning = false;
      this.emitter.emit('metrics', { type: 'server_stop', timestamp: Date.now() });
    } catch (error) {
      this.handleError(error);
    }
  }

  private async handleRequest(request: ServerRequest): Promise<void> {
    try {
      const startTime = Date.now();
      await this.requestHandler.handle(request);
      
      this.metrics.collect({
        type: 'request',
        duration: Date.now() - startTime,
        operation: request.type
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): void {
    this.emitter.emit('metrics', {
      type: 'error',
      error: error instanceof Error ? error.message : String(error),
      timestamp: Date.now()
    });

    // Implement error recovery strategies
    this.attemptRecovery(error);
  }

  private attemptRecovery(error: any): void {
    if (error instanceof Error) {
      if (error.message.includes('connection')) {
        this.connections.cleanup();
      } else if (error.message.includes('memory')) {
        // Implement memory cleanup
      }
    }
  }

  getMetrics(): ServerMetrics {
    return this.metrics.getMetrics();
  }

  getStatus(): {
    isRunning: boolean;
    connections: number;
    uptime: number;
  } {
    return {
      isRunning: this.isRunning,
      connections: this.connections.getActiveConnections(),
      uptime: this.metrics.getUptime()
    };
  }
}