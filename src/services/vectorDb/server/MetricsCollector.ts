import { ServerMetrics, MetricEvent } from './types';

export class MetricsCollector {
  private metrics: ServerMetrics = {
    requests: {
      total: 0,
      successful: 0,
      failed: 0,
      averageLatency: 0
    },
    connections: {
      current: 0,
      peak: 0,
      total: 0
    },
    memory: {
      used: 0,
      available: 0,
      peak: 0
    },
    uptime: 0
  };

  private startTime: number = Date.now();

  collect(event: MetricEvent): void {
    switch (event.type) {
      case 'request':
        this.updateRequestMetrics(event);
        break;
      case 'connection':
        this.updateConnectionMetrics(event);
        break;
      case 'error':
        this.updateErrorMetrics(event);
        break;
    }

    this.updateMemoryMetrics();
  }

  private updateRequestMetrics(event: MetricEvent): void {
    this.metrics.requests.total++;
    if (event.duration) {
      const totalLatency = this.metrics.requests.averageLatency * (this.metrics.requests.total - 1);
      this.metrics.requests.averageLatency = (totalLatency + event.duration) / this.metrics.requests.total;
    }
  }

  private updateConnectionMetrics(event: MetricEvent): void {
    if (event.type === 'connection_open') {
      this.metrics.connections.current++;
      this.metrics.connections.total++;
      this.metrics.connections.peak = Math.max(
        this.metrics.connections.peak,
        this.metrics.connections.current
      );
    } else if (event.type === 'connection_close') {
      this.metrics.connections.current--;
    }
  }

  private updateErrorMetrics(event: MetricEvent): void {
    this.metrics.requests.failed++;
  }

  private updateMemoryMetrics(): void {
    const memory = process.memoryUsage();
    this.metrics.memory.used = memory.heapUsed;
    this.metrics.memory.available = memory.heapTotal - memory.heapUsed;
    this.metrics.memory.peak = Math.max(this.metrics.memory.peak, memory.heapUsed);
  }

  getMetrics(): ServerMetrics {
    return {
      ...this.metrics,
      uptime: Date.now() - this.startTime
    };
  }

  getUptime(): number {
    return Date.now() - this.startTime;
  }

  reset(): void {
    this.startTime = Date.now();
    this.metrics = {
      requests: { total: 0, successful: 0, failed: 0, averageLatency: 0 },
      connections: { current: 0, peak: 0, total: 0 },
      memory: { used: 0, available: 0, peak: 0 },
      uptime: 0
    };
  }
}