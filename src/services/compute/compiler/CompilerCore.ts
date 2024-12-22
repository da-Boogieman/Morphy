import { Lexer } from './Lexer';
import { Parser } from './Parser';
import { CodeGenerator } from './CodeGenerator';
import { VirtualMachine } from '../vm/VirtualMachine';
import type { CompilerOptions, CompilationResult, LanguageConfig } from './types';

export class CompilerCore {
  private static instance: CompilerCore;
  private lexer: Lexer;
  private parser: Parser;
  private codeGenerator: CodeGenerator;
  private vm: VirtualMachine;
  private languageConfigs: Map<string, LanguageConfig> = new Map();

  private constructor() {
    this.lexer = new Lexer();
    this.parser = new Parser();
    this.codeGenerator = new CodeGenerator();
    this.vm = VirtualMachine.getInstance();
    this.initializeLanguages();
  }

  static getInstance(): CompilerCore {
    if (!CompilerCore.instance) {
      CompilerCore.instance = new CompilerCore();
    }
    return CompilerCore.instance;
  }

  private initializeLanguages(): void {
    // Add built-in language configurations
    this.addLanguage('javascript', {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      syntax: {
        keywords: ['function', 'class', 'const', 'let', 'var'],
        operators: ['+', '-', '*', '/', '=', '==', '==='],
        delimiters: ['{', '}', '(', ')', '[', ']', ';', ',']
      },
      features: {
        supportsAsync: true,
        supportsClasses: true,
        supportsModules: true
      }
    });

    // Add more languages as needed
  }

  async compile(
    source: string,
    language: string,
    options: CompilerOptions = {}
  ): Promise<CompilationResult> {
    const config = this.languageConfigs.get(language);
    if (!config) {
      throw new Error(`Language ${language} not supported`);
    }

    try {
      // Lexical analysis
      const tokens = await this.lexer.tokenize(source, config.syntax);

      // Parsing
      const ast = await this.parser.parse(tokens, config);

      // Code generation
      const bytecode = await this.codeGenerator.generate(ast, {
        target: options.target || 'bytecode',
        optimize: options.optimize || false
      });

      return {
        success: true,
        bytecode,
        ast,
        tokens,
        language,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Compilation failed',
        language,
        timestamp: Date.now()
      };
    }
  }

  async execute(
    compilationResult: CompilationResult,
    context: Record<string, any> = {}
  ): Promise<any> {
    if (!compilationResult.success || !compilationResult.bytecode) {
      throw new Error('Invalid compilation result');
    }

    return this.vm.execute(compilationResult.bytecode, context);
  }

  addLanguage(name: string, config: LanguageConfig): void {
    this.languageConfigs.set(name, config);
  }

  getLanguageConfig(language: string): LanguageConfig | undefined {
    return this.languageConfigs.get(language);
  }
}