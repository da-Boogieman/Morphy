import { GPUDevice, GPUTask } from '../../types/gpu';
import { initializeShaders } from './shaders';
import { createPipeline } from './pipeline';

export class GPUService {
  private device: GPUAdapter | null = null;
  private context: GPUCanvasContext | null = null;
  private pipeline: GPUComputePipeline | null = null;
  private taskQueue: GPUTask[] = [];

  async initialize(): Promise<GPUDevice> {
    if (!navigator.gpu) {
      throw new Error('WebGPU not supported');
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error('No GPU adapter found');
    }

    this.device = await adapter.requestDevice();
    await initializeShaders(this.device);
    this.pipeline = await createPipeline(this.device);

    return {
      id: crypto.randomUUID(),
      name: 'WebGPU Device',
      features: {
        shaderFloat16: adapter.features.has('shader-f16'),
        shaderInt8: adapter.features.has('shader-i8'),
        timestampQuery: adapter.features.has('timestamp-query'),
        pipelineStatisticsQuery: adapter.features.has('pipeline-statistics-query')
      },
      limits: {
        maxComputeWorkgroupsPerDimension: this.device.limits.maxComputeWorkgroupsPerDimension,
        maxComputeInvocationsPerWorkgroup: this.device.limits.maxComputeInvocationsPerWorkgroup,
        maxStorageBufferBindingSize: this.device.limits.maxStorageBufferBindingSize,
        maxUniformBufferBindingSize: this.device.limits.maxUniformBufferBindingSize
      },
      status: 'ready'
    };
  }

  async submitTask(task: GPUTask): Promise<Float32Array> {
    if (!this.device || !this.pipeline) {
      throw new Error('GPU not initialized');
    }

    const inputBuffer = this.device.createBuffer({
      size: task.input.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
      mappedAtCreation: true,
    });

    new Float32Array(inputBuffer.getMappedRange()).set(task.input);
    inputBuffer.unmap();

    const outputBuffer = this.device.createBuffer({
      size: task.input.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    const commandEncoder = this.device.createCommandEncoder();
    const computePass = commandEncoder.beginComputePass();
    
    computePass.setPipeline(this.pipeline);
    computePass.setBindGroup(0, this.device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: inputBuffer } },
        { binding: 1, resource: { buffer: outputBuffer } },
      ],
    }));

    const [x, y, z] = task.workgroupSize;
    computePass.dispatchWorkgroups(x, y, z);
    computePass.end();

    const gpuCommands = commandEncoder.finish();
    this.device.queue.submit([gpuCommands]);

    // Read back the results
    const readBuffer = this.device.createBuffer({
      size: task.input.byteLength,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    commandEncoder.copyBufferToBuffer(
      outputBuffer,
      0,
      readBuffer,
      0,
      task.input.byteLength
    );

    await readBuffer.mapAsync(GPUMapMode.READ);
    const results = new Float32Array(readBuffer.getMappedRange());
    readBuffer.unmap();

    return results;
  }
}