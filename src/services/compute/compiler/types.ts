export interface CompilerOptions {
  target?: 'bytecode' | 'assembly' | 'native';
  optimize?: boolean;
  optimizationLevel?: number;
  harmonicOptimization?: number;
  context?: Record<string, any>;
}

export interface QuantumCompilationOptions extends CompilerOptions {
  quantumOptimize?: boolean;
  coherenceThreshold?: number;
  entanglementPreserve?: boolean;
}

export interface CompilationResult {
  success: boolean;
  bytecode?: Uint8Array;
  ast?: ASTNode;
  tokens?: Token[];
  error?: string;
  language: string;
  timestamp: number;
  quantumMetrics?: {
    coherence: number;
    entanglement: number;
    superposition: number;
    harmonicResonance: number;
    frequency: number;
  };
}

export interface Token {
  type: string;
  value: string;
  line: number;
  column: number;
}

export interface ASTNode {
  type: string;
  [key: string]: any;
}

export interface LanguageConfig {
  extensions: string[];
  syntax: {
    keywords: string[];
    operators: string[];
    delimiters: string[];
  };
  features: {
    supportsAsync: boolean;
    supportsClasses: boolean;
    supportsModules: boolean;
  };
}