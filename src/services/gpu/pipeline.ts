import { GPUDevice } from '../../types/gpu';
import { getShaderCode } from './shaders';

export async function createPipeline(device: GPUDevice): Promise<GPUComputePipeline> {
  // Create shader module
  const shaderModule = device.createShaderModule({
    code: getShaderCode('compute')
  });

  // Create pipeline layout
  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.COMPUTE,
        buffer: {
          type: 'storage'
        }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.COMPUTE,
        buffer: {
          type: 'storage'
        }
      }
    ]
  });

  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout]
  });

  // Create compute pipeline
  return await device.createComputePipelineAsync({
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: 'main'
    }
  });
}