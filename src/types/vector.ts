export interface Vector {
  id: string;
  values: number[];
  metadata?: Record<string, any>;
  timestamp: number;
}

export interface Collection {
  id: string;
  name: string;
  dimension: number;
  parentId?: string;
}

export interface SearchResult {
  vector: Vector;
  score: number;
  path: string[];
}

export interface DBConfig {
  maxCollectionSize?: number;
  similarityThreshold?: number;
  maxSearchResults?: number;
}