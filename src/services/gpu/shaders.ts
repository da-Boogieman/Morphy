export function initializeShaders(device: any): Promise<void> {
  return Promise.resolve();
}

export function getShaderCode(type: 'compute' | 'vector'): string {
  const shaders = {
    compute: `
      @group(0) @binding(0) var<storage, read> input: array<f32>;
      @group(0) @binding(1) var<storage, write> output: array<f32>;

      @compute @workgroup_size(64)
      fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
        let index = global_id.x;
        if (index >= arrayLength(&input)) {
          return;
        }
        output[index] = input[index] * input[index];
      }
    `,
    vector: `
      @group(0) @binding(0) var<storage, read> vectorA: array<f32>;
      @group(0) @binding(1) var<storage, read> vectorB: array<f32>;
      @group(0) @binding(2) var<storage, write> result: array<f32>;

      @compute @workgroup_size(64)
      fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
        let index = global_id.x;
        if (index >= arrayLength(&vectorA)) {
          return;
        }
        result[index] = vectorA[index] * vectorB[index];
      }
    `
  };

  return shaders[type];
}