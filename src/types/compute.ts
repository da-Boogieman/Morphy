export interface ComputeNode {
  id: string;
  status: 'idle' | 'processing' | 'error';
  capabilities: string[];
  metrics: {
    cpu: number;
    memory: number;
    operations: number;
  };
}

export interface ComputeTask {
  id: string;
  type: 'vector' | 'tensor' | 'matrix';
  priority: number;
  data: Float64Array;
  dependencies?: string[];
  timestamp: number;
}

export interface ComputeResult {
  taskId: string;
  result: Float64Array;
  metrics: {
    duration: number;
    operations: number;
  };
}

export type Operation = 
  | 'multiply'
  | 'convolve'
  | 'transform'
  | 'decompose';