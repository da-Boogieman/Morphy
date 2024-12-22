import { Vector } from '../../types/vector';
import { vectorMath } from './utils/math';
import { vectorValidation } from './utils/validation';

/**
 * Calculate cosine similarity between two vectors
 */
export function calculateDistance(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vector dimensions must match');
  }

  const dotProduct = vectorMath.dot(a, b);
  const magnitudeA = vectorMath.magnitude(a);
  const magnitudeB = vectorMath.magnitude(b);

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Normalize vector to unit length
 */
export function normalizeVector(vector: number[]): number[] {
  const magnitude = vectorMath.magnitude(vector);
  return vectorMath.multiply(vector, 1 / magnitude);
}

/**
 * Convert vector to fixed dimensions
 */
export function padVector(vector: number[], targetDim: number): number[] {
  if (vector.length >= targetDim) {
    return vector.slice(0, targetDim);
  }
  return [...vector, ...Array(targetDim - vector.length).fill(0)];
}

/**
 * Validate vector format and dimensions
 */
export function validateVector(vector: Vector, dimension: number): boolean {
  return vectorValidation.isValidVector(vector) && 
         vectorValidation.checkDimensions(vector.values, dimension);
}

/**
 * Calculate vector statistics
 */
export function calculateVectorStats(vectors: Vector[]) {
  if (vectors.length === 0) return null;

  const dimensions = vectors[0].values.length;
  const stats = {
    mean: new Array(dimensions).fill(0),
    variance: new Array(dimensions).fill(0),
    min: [...vectors[0].values],
    max: [...vectors[0].values]
  };

  // Calculate mean
  vectors.forEach(vector => {
    vector.values.forEach((val, i) => {
      stats.mean[i] += val / vectors.length;
      stats.min[i] = Math.min(stats.min[i], val);
      stats.max[i] = Math.max(stats.max[i], val);
    });
  });

  // Calculate variance
  vectors.forEach(vector => {
    vector.values.forEach((val, i) => {
      stats.variance[i] += Math.pow(val - stats.mean[i], 2) / vectors.length;
    });
  });

  return stats;
}