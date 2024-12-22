import { EventEmitter } from 'events';

export class DebugCore {
  private static instance: DebugCore;
  private emitter: EventEmitter;
  private logs: Array<{
    level: 'info' | 'warn' | 'error' | 'debug';
    message: string;
    timestamp: number;
    context?: any;
  }> = [];

  private constructor() {
    this.emitter = new EventEmitter();
    this.setupListeners();
  }

  static getInstance(): DebugCore {
    if (!DebugCore.instance) {
      DebugCore.instance = new DebugCore();
    }
    return DebugCore.instance;
  }

  private setupListeners(): void {
    this.emitter.on('error', (error) => {
      this.handleError(error);
    });

    window.onerror = (message, source, lineno, colno, error) => {
      this.handleError(error || message);
    };

    window.onunhandledrejection = (event) => {
      this.handleError(event.reason);
    };
  }

  log(level: 'info' | 'warn' | 'error' | 'debug', message: string, context?: any): void {
    const logEntry = {
      level,
      message,
      timestamp: Date.now(),
      context
    };

    this.logs.push(logEntry);
    this.emitter.emit(level, logEntry);

    if (level === 'error') {
      this.handleError(message);
    }
  }

  private handleError(error: any): void {
    const errorInfo = {
      message: error?.message || String(error),
      stack: error?.stack,
      timestamp: Date.now()
    };

    this.logs.push({
      level: 'error',
      message: errorInfo.message,
      timestamp: errorInfo.timestamp,
      context: { stack: errorInfo.stack }
    });

    // Implement self-healing if possible
    this.attemptRecovery(errorInfo);
  }

  private attemptRecovery(errorInfo: any): void {
    // Implement recovery strategies based on error type
    if (errorInfo.message.includes('memory')) {
      this.cleanupMemory();
    } else if (errorInfo.message.includes('connection')) {
      this.retryConnection();
    }
  }

  private cleanupMemory(): void {
    this.logs = this.logs.slice(-1000); // Keep only recent logs
    // Additional memory cleanup strategies
  }

  private retryConnection(): void {
    // Implement connection retry logic
  }

  getLogs(level?: 'info' | 'warn' | 'error' | 'debug'): typeof this.logs {
    return level 
      ? this.logs.filter(log => log.level === level)
      : this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }
}