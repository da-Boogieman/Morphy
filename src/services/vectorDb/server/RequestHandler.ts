import { VectorDB } from '../VectorDB';
import { ServerRequest } from './types';

export class RequestHandler {
  constructor(private db: VectorDB) {}

  async handle(request: ServerRequest): Promise<any> {
    switch (request.type) {
      case 'search':
        return this.handleSearch(request);
      case 'insert':
        return this.handleInsert(request);
      case 'delete':
        return this.handleDelete(request);
      case 'update':
        return this.handleUpdate(request);
      default:
        throw new Error(`Unknown request type: ${request.type}`);
    }
  }

  private async handleSearch(request: ServerRequest): Promise<any> {
    const { collection, data } = request;
    return this.db.search(collection, data.query, data.limit);
  }

  private async handleInsert(request: ServerRequest): Promise<any> {
    const { collection, data } = request;
    return this.db.addVector(collection, data);
  }

  private async handleDelete(request: ServerRequest): Promise<void> {
    // Implement delete operation
  }

  private async handleUpdate(request: ServerRequest): Promise<void> {
    // Implement update operation
  }
}