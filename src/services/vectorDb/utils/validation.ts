import { Vector } from '../../../types/vector';

/**
 * Vector validation utilities
 */
export const vectorValidation = {
  checkDimensions: (vector: number[], expectedDim: number): boolean => {
    return vector.length === expectedDim;
  },

  isValidVector: (vector: Vector): boolean => {
    return (
      Array.isArray(vector.values) &&
      vector.values.every(val => typeof val === 'number' && !isNaN(val))
    );
  },

  validateMetadata: (metadata: any): boolean => {
    if (!metadata || typeof metadata !== 'object') {
      return false;
    }
    return Object.entries(metadata).every(([key, value]) => 
      typeof key === 'string' && value !== undefined
    );
  }
};