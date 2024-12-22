import type { Token, ASTNode, LanguageConfig } from './types';

export class Parser {
  private tokens: Token[] = [];
  private current = 0;
  private config: LanguageConfig;

  async parse(tokens: Token[], config: LanguageConfig): Promise<ASTNode> {
    this.tokens = tokens;
    this.current = 0;
    this.config = config;

    const program: ASTNode = {
      type: 'Program',
      body: []
    };

    while (!this.isAtEnd()) {
      program.body.push(await this.parseStatement());
    }

    return program;
  }

  private async parseStatement(): Promise<ASTNode> {
    const token = this.peek();

    switch (token.type) {
      case 'keyword':
        switch (token.value) {
          case 'function':
            return this.parseFunctionDeclaration();
          case 'class':
            return this.parseClassDeclaration();
          case 'const':
          case 'let':
          case 'var':
            return this.parseVariableDeclaration();
          default:
            return this.parseExpressionStatement();
        }
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseFunctionDeclaration(): ASTNode {
    this.consume('keyword', 'function');
    const name = this.consume('identifier', null);
    this.consume('delimiter', '(');
    
    const params: ASTNode[] = [];
    while (!this.check('delimiter', ')')) {
      params.push({
        type: 'Parameter',
        value: this.consume('identifier', null).value
      });
      
      if (!this.check('delimiter', ')')) {
        this.consume('delimiter', ',');
      }
    }
    this.consume('delimiter', ')');
    
    const body = this.parseBlock();

    return {
      type: 'FunctionDeclaration',
      name: name.value,
      params,
      body,
      location: this.getLocation(name)
    };
  }

  private parseClassDeclaration(): ASTNode {
    this.consume('keyword', 'class');
    const name = this.consume('identifier', null);
    
    let superclass = null;
    if (this.match('keyword', 'extends')) {
      superclass = {
        type: 'Identifier',
        value: this.consume('identifier', null).value
      };
    }

    this.consume('delimiter', '{');
    const methods: ASTNode[] = [];
    
    while (!this.check('delimiter', '}')) {
      methods.push(this.parseMethod());
    }
    
    this.consume('delimiter', '}');

    return {
      type: 'ClassDeclaration',
      name: name.value,
      superclass,
      methods,
      location: this.getLocation(name)
    };
  }

  private parseMethod(): ASTNode {
    const name = this.consume('identifier', null);
    this.consume('delimiter', '(');
    
    const params: ASTNode[] = [];
    while (!this.check('delimiter', ')')) {
      params.push({
        type: 'Parameter',
        value: this.consume('identifier', null).value
      });
      
      if (!this.check('delimiter', ')')) {
        this.consume('delimiter', ',');
      }
    }
    this.consume('delimiter', ')');
    
    const body = this.parseBlock();

    return {
      type: 'MethodDefinition',
      name: name.value,
      params,
      body,
      location: this.getLocation(name)
    };
  }

  private parseVariableDeclaration(): ASTNode {
    const kind = this.advance().value;
    const name = this.consume('identifier', null);
    
    let init = null;
    if (this.match('operator', '=')) {
      init = this.parseExpression();
    }
    
    this.consume('delimiter', ';');

    return {
      type: 'VariableDeclaration',
      kind,
      name: name.value,
      init,
      location: this.getLocation(name)
    };
  }

  private parseExpressionStatement(): ASTNode {
    const expr = this.parseExpression();
    this.consume('delimiter', ';');
    return {
      type: 'ExpressionStatement',
      expression: expr
    };
  }

  private parseExpression(): ASTNode {
    return this.parseAssignment();
  }

  private parseAssignment(): ASTNode {
    const expr = this.parseEquality();

    if (this.match('operator', '=')) {
      const equals = this.previous();
      const value = this.parseAssignment();

      if (expr.type === 'Identifier') {
        return {
          type: 'AssignmentExpression',
          operator: '=',
          left: expr,
          right: value,
          location: this.getLocation(equals)
        };
      }

      throw this.error(equals, 'Invalid assignment target.');
    }

    return expr;
  }

  private parseEquality(): ASTNode {
    let expr = this.parseComparison();

    while (this.match('operator', '==', '!=')) {
      const operator = this.previous().value;
      const right = this.parseComparison();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right
      };
    }

    return expr;
  }

  private parseComparison(): ASTNode {
    let expr = this.parseAdditive();

    while (this.match('operator', '>', '>=', '<', '<=')) {
      const operator = this.previous().value;
      const right = this.parseAdditive();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right
      };
    }

    return expr;
  }

  private parseAdditive(): ASTNode {
    let expr = this.parseMultiplicative();

    while (this.match('operator', '+', '-')) {
      const operator = this.previous().value;
      const right = this.parseMultiplicative();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right
      };
    }

    return expr;
  }

  private parseMultiplicative(): ASTNode {
    let expr = this.parseUnary();

    while (this.match('operator', '*', '/')) {
      const operator = this.previous().value;
      const right = this.parseUnary();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right
      };
    }

    return expr;
  }

  private parseUnary(): ASTNode {
    if (this.match('operator', '!', '-')) {
      const operator = this.previous().value;
      const right = this.parseUnary();
      return {
        type: 'UnaryExpression',
        operator,
        right
      };
    }

    return this.parsePrimary();
  }

  private parsePrimary(): ASTNode {
    if (this.match('number')) {
      return {
        type: 'NumericLiteral',
        value: parseFloat(this.previous().value)
      };
    }

    if (this.match('string')) {
      return {
        type: 'StringLiteral',
        value: this.previous().value
      };
    }

    if (this.match('identifier')) {
      return {
        type: 'Identifier',
        value: this.previous().value
      };
    }

    throw this.error(this.peek(), 'Expected expression.');
  }

  private parseBlock(): ASTNode {
    this.consume('delimiter', '{');
    const statements: ASTNode[] = [];
    
    while (!this.check('delimiter', '}')) {
      statements.push(this.parseStatement());
    }
    
    this.consume('delimiter', '}');

    return {
      type: 'BlockStatement',
      body: statements
    };
  }

  private match(...types: string[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private check(type: string, value: string | null = null): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type && 
           (value === null || this.peek().value === value);
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private consume(type: string, value: string | null): Token {
    if (this.check(type, value)) {
      return this.advance();
    }

    throw this.error(
      this.peek(),
      `Expected ${type}${value ? ` "${value}"` : ''}.`
    );
  }

  private isAtEnd(): boolean {
    return this.current >= this.tokens.length;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private error(token: Token, message: string): Error {
    return new Error(
      `Error at line ${token.line}, column ${token.column}: ${message}`
    );
  }

  private getLocation(token: Token) {
    return {
      start: { line: token.line, column: token.column },
      end: { line: token.line, column: token.column + token.value.length }
    };
  }
}