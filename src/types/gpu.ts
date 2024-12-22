export interface GPUDevice {
  id: string;
  name: string;
  features: GPUFeatures;
  limits: GPULimits;
  status: 'ready' | 'initializing' | 'error';
}

export interface GPUFeatures {
  shaderFloat16: boolean;
  shaderInt8: boolean;
  timestampQuery: boolean;
  pipelineStatisticsQuery: boolean;
}

export interface GPULimits {
  maxComputeWorkgroupsPerDimension: number;
  maxComputeInvocationsPerWorkgroup: number;
  maxStorageBufferBindingSize: number;
  maxUniformBufferBindingSize: number;
}

export interface GPUTask {
  id: string;
  type: 'compute' | 'render' | 'transfer';
  shader: string;
  input: Float32Array | Float64Array;
  workgroupSize: [number, number, number];
  priority: number;
}