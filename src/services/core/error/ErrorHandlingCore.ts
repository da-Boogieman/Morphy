import { DebugCore } from '../../debug/DebugCore';
import { EventEmitter } from 'events';

export class ErrorHandlingCore {
  private static instance: ErrorHandlingCore;
  private debug: DebugCore;
  private emitter: EventEmitter;

  private constructor() {
    this.debug = DebugCore.getInstance();
    this.emitter = new EventEmitter();
    this.setupErrorHandlers();
  }

  static getInstance(): ErrorHandlingCore {
    if (!ErrorHandlingCore.instance) {
      ErrorHandlingCore.instance = new ErrorHandlingCore();
    }
    return ErrorHandlingCore.instance;
  }

  private setupErrorHandlers(): void {
    window.onerror = (message, source, lineno, colno, error) => {
      this.handleError(error || message);
    };

    window.onunhandledrejection = (event) => {
      this.handleError(event.reason);
    };
  }

  handleError(error: any): void {
    this.debug.log('error', error instanceof Error ? error.message : String(error));
    this.emitter.emit('error', error);
  }

  async attemptRecovery(error: Error): Promise<boolean> {
    this.debug.log('info', `Attempting recovery from error: ${error.message}`);
    // Implement recovery strategies
    return true;
  }
}