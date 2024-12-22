export interface ServerConfig {
  maxConnections: number;
  requestTimeout: number;
  maxRequestSize: number;
}

export interface ServerMetrics {
  requests: {
    total: number;
    successful: number;
    failed: number;
    averageLatency: number;
  };
  connections: {
    current: number;
    peak: number;
    total: number;
  };
  memory: {
    used: number;
    available: number;
    peak: number;
  };
  uptime: number;
}

export interface ServerRequest {
  id: string;
  type: 'search' | 'insert' | 'delete' | 'update';
  collection: string;
  data: any;
  timestamp: number;
}

export interface MetricEvent {
  type: string;
  timestamp: number;
  duration?: number;
  operation?: string;
  error?: string;
}