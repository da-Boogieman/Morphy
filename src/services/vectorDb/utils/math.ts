export const vectorMath = {
  add: (a: number[], b: number[]): number[] => {
    return a.map((val, i) => val + b[i]);
  },

  subtract: (a: number[], b: number[]): number[] => {
    return a.map((val, i) => val - b[i]);
  },

  multiply: (vector: number[], scalar: number): number[] => {
    return vector.map(val => val * scalar);
  },

  dot: (a: number[], b: number[]): number => {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
  },

  magnitude: (vector: number[]): number => {
    return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  },

  cosineSimilarity: (a: number[], b: number[]): number => {
    const dotProduct = vectorMath.dot(a, b);
    const magnitudeA = vectorMath.magnitude(a);
    const magnitudeB = vectorMath.magnitude(b);
    return dotProduct / (magnitudeA * magnitudeB);
  }
};

export const calculateDistance = vectorMath.cosineSimilarity;
export const normalizeVector = (vector: number[]): number[] => {
  const magnitude = vectorMath.magnitude(vector);
  return vectorMath.multiply(vector, 1 / magnitude);
};