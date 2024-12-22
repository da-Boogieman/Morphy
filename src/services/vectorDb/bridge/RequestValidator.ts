import { ServerRequest } from '../server/types';
import { z } from 'zod';

export class RequestValidator {
  private schemas: Map<string, z.ZodSchema> = new Map();

  constructor() {
    this.initializeSchemas();
  }

  private initializeSchemas(): void {
    // Search request schema
    this.schemas.set('search', z.object({
      collection: z.string(),
      data: z.object({
        query: z.array(z.number()),
        limit: z.number().optional()
      })
    }));

    // Insert request schema
    this.schemas.set('insert', z.object({
      collection: z.string(),
      data: z.object({
        values: z.array(z.number()),
        metadata: z.record(z.any()).optional()
      })
    }));
  }

  async validateRequest(request: ServerRequest): Promise<boolean> {
    try {
      const schema = this.schemas.get(request.type);
      if (!schema) {
        throw new Error(`No validation schema for request type: ${request.type}`);
      }

      // Validate request format
      schema.parse(request);

      // Validate data size
      if (!this.validateDataSize(request)) {
        throw new Error('Request data size exceeds limit');
      }

      // Validate vector dimensions
      if (!this.validateVectorDimensions(request)) {
        throw new Error('Invalid vector dimensions');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  private validateDataSize(request: ServerRequest): boolean {
    const maxSize = 1024 * 1024; // 1MB
    const size = new TextEncoder().encode(JSON.stringify(request.data)).length;
    return size <= maxSize;
  }

  private validateVectorDimensions(request: ServerRequest): boolean {
    if (request.type === 'search' || request.type === 'insert') {
      const vector = request.type === 'search' 
        ? request.data.query 
        : request.data.values;
      
      return vector.length > 0 && vector.length <= 1024;
    }
    return true;
  }
}