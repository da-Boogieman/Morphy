import type { Token, LanguageConfig } from './types';

export class Lexer {
  async tokenize(source: string, config: LanguageConfig['syntax']): Promise<Token[]> {
    const tokens: Token[] = [];
    let current = 0;
    let line = 1;
    let column = 1;

    while (current < source.length) {
      let char = source[current];

      // Handle whitespace
      if (/\s/.test(char)) {
        if (char === '\n') {
          line++;
          column = 1;
        } else {
          column++;
        }
        current++;
        continue;
      }

      // Handle keywords and identifiers
      if (/[a-zA-Z_]/.test(char)) {
        let value = '';
        while (current < source.length && /[a-zA-Z0-9_]/.test(source[current])) {
          value += source[current];
          current++;
          column++;
        }

        const token: Token = {
          type: config.keywords.includes(value) ? 'keyword' : 'identifier',
          value,
          line,
          column: column - value.length
        };
        tokens.push(token);
        continue;
      }

      // Handle numbers
      if (/[0-9]/.test(char)) {
        let value = '';
        while (current < source.length && /[0-9.]/.test(source[current])) {
          value += source[current];
          current++;
          column++;
        }

        tokens.push({
          type: 'number',
          value,
          line,
          column: column - value.length
        });
        continue;
      }

      // Handle operators
      const possibleOperator = this.findLongestOperator(
        source.slice(current),
        config.operators
      );
      if (possibleOperator) {
        tokens.push({
          type: 'operator',
          value: possibleOperator,
          line,
          column
        });
        current += possibleOperator.length;
        column += possibleOperator.length;
        continue;
      }

      // Handle delimiters
      if (config.delimiters.includes(char)) {
        tokens.push({
          type: 'delimiter',
          value: char,
          line,
          column
        });
        current++;
        column++;
        continue;
      }

      // Handle strings
      if (char === '"' || char === "'") {
        const quote = char;
        let value = '';
        current++;
        column++;

        while (current < source.length && source[current] !== quote) {
          if (source[current] === '\\') {
            current++;
            column++;
            if (current < source.length) {
              value += source[current];
            }
          } else {
            value += source[current];
          }
          current++;
          column++;
        }

        current++;
        column++;

        tokens.push({
          type: 'string',
          value,
          line,
          column: column - value.length - 2
        });
        continue;
      }

      // Handle unrecognized characters
      throw new Error(`Unexpected character: ${char} at line ${line}, column ${column}`);
    }

    return tokens;
  }

  private findLongestOperator(text: string, operators: string[]): string | null {
    let longestOp = null;
    for (const op of operators) {
      if (text.startsWith(op) && (!longestOp || op.length > longestOp.length)) {
        longestOp = op;
      }
    }
    return longestOp;
  }
}