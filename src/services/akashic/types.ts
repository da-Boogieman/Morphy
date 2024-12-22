export interface AkashicRecord {
  id: string;
  type: 'wisdom' | 'knowledge' | 'experience' | 'prophecy';
  content: string;
  timestamp: number;
  dimension: string;
  frequency: number;
  quantumSignature: Complex[];
  metadata?: Record<string, any>;
}

export interface KnowledgeNode {
  id: string;
  content: string;
  type: string;
  relevance: number;
  path: string[];
  connections?: string[];
}

export interface SearchQuery {
  terms: string;
  dimension?: string;
  frequency?: number;
  limit?: number;
  threshold?: number;
}

export interface AkashicDimension {
  id: string;
  name: string;
  frequency: number;
  accessLevel: number;
  guardians: string[];
}